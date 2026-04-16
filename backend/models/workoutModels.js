import database from "../configs/database.js";

const workout_models = {
    addWorkout: async (name, reps, sets, user_id) => {
        const query = "INSERT INTO workouts (name, reps, sets, user_id) VALUES (?, ?, ?, ?)";
        return new Promise((resolve, reject) => {
            database.query(query, [name, reps, sets, user_id], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    },

    getWorkouts: async (user_id) => {
        const query = "SELECT * FROM workouts WHERE user_id = ?";
        return new Promise((resolve, reject) => {
            database.query(query, [user_id], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    },

    editWorkout: async (name, reps, sets, id, user_id) => {
        const query = "UPDATE workouts SET name = ?, reps = ?, sets = ? WHERE id = ? AND user_id = ?";
        return new Promise((resolve, reject) => {
            database.query(query, [name, reps, sets, id, user_id], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    },

    deleteWorkout: async (id, user_id) => {
        const query = "DELETE FROM workouts WHERE id = ? AND user_id = ?";
        return new Promise((resolve, reject) => {
            database.query(query, [id, user_id], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    }
};

export default workout_models;