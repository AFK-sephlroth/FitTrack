import database from "../configs/database.js";

const goal_models = {
    addGoal: async (goal) => {
        const query = "INSERT INTO goals (goal) VALUES (?)";
        return new Promise((resolve, reject) => {
            database.query(query, [goal], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    },

    getGoals: async () => {
        const query = "SELECT * FROM goals";
        return new Promise((resolve, reject) => {
            database.query(query, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    },

    editGoal: async (goal, id) => {
        const query = "UPDATE goals SET goal = ? WHERE id = ?";
        return new Promise((resolve, reject) => {
            database.query(query, [goal, id], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    },

    deleteGoal: async (id) => {
        const query = "DELETE FROM goals WHERE id = ?";
        return new Promise((resolve, reject) => {
            database.query(query, [id], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    }
};

export default goal_models;