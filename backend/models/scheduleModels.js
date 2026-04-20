import database from "../configs/database.js";

const schedule_models = {
    addSchedule: async (date_key, event, user_id) => {
        const query = "INSERT INTO schedules (date_key, event, user_id) VALUES (?, ?, ?)";
        return new Promise((resolve, reject) => {
            database.query(query, [date_key, event, user_id], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    },

    getSchedules: async (user_id) => {
        const query = "SELECT * FROM schedules WHERE user_id = ? ORDER BY date_key ASC";
        return new Promise((resolve, reject) => {
            database.query(query, [user_id], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    },

    deleteSchedule: async (id, user_id) => {
        const query = "DELETE FROM schedules WHERE id = ? AND user_id = ?";
        return new Promise((resolve, reject) => {
            database.query(query, [id, user_id], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    }
};

export default schedule_models;