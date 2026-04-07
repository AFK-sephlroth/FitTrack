import database from "../configs/database.js";

const schedule_models = {
    addSchedule: async (date_key, event) => {
        const query = "INSERT INTO schedules (date_key, event) VALUES (?, ?)";
        return new Promise((resolve, reject) => {
            database.query(query, [date_key, event], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    },

    getSchedules: async () => {
        const query = "SELECT * FROM schedules ORDER BY date_key ASC";
        return new Promise((resolve, reject) => {
            database.query(query, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    },

    deleteSchedule: async (id) => {
        const query = "DELETE FROM schedules WHERE id = ?";
        return new Promise((resolve, reject) => {
            database.query(query, [id], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    }
};

export default schedule_models;