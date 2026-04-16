import database from "../configs/database.js";

const goal_models = {
    addGoal: async (goal, user_id) => {
        const query = "INSERT INTO goals (goal, user_id) VALUES (?, ?)";
        return new Promise((resolve, reject) => {
            database.query(query, [goal, user_id], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    },

    getGoals: async (user_id) => {
        const query = "SELECT * FROM goals WHERE user_id = ?";
        return new Promise((resolve, reject) => {
            database.query(query, [user_id], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    },

    editGoal: async (goal, id, user_id) => {
        const query = "UPDATE goals SET goal = ? WHERE id = ? AND user_id = ?";
        return new Promise((resolve, reject) => {
            database.query(query, [goal, id, user_id], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    },

    deleteGoal: async (id, user_id) => {
        const query = "DELETE FROM goals WHERE id = ? AND user_id = ?";
        return new Promise((resolve, reject) => {
            database.query(query, [id, user_id], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    }
};

export default goal_models;