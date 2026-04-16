import database from "../configs/database.js";

const workout_models = {
    addWorkout: async (name, reps, sets) => {
        const query = "INSERT INTO workouts (name, reps, sets) VALUES (?, ?, ?)";
        return new Promise((resolve, reject) => {
            database.query(query, [name, reps, sets], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    },

    getWorkouts: async () => {
        const query = "SELECT * FROM workouts";
        return new Promise((resolve, reject) => {
            database.query(query, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    },

    editWorkout: async (name, reps, sets, id) => {
        const query = "UPDATE workouts SET name = ?, reps = ?, sets = ? WHERE id = ?";
        return new Promise((resolve, reject) => {
            database.query(query, [name, reps, sets, id], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    },

    deleteWorkout: async (id) => {
        const query = "DELETE FROM workouts WHERE id = ?";
        return new Promise((resolve, reject) => {
            database.query(query, [id], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    }
};

export default workout_models;