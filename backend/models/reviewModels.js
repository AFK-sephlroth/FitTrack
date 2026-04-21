import database from "../configs/database.js";

const review_models = {
    addReview: async (user_id, username, rating, feedback) => {
        const query = "INSERT INTO reviews (user_id, username, rating, feedback) VALUES (?, ?, ?, ?)";
        return new Promise((resolve, reject) => {
            database.query(query, [user_id, username, rating, feedback], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    },

    getReviews: async () => {
        const query = "SELECT * FROM reviews ORDER BY created_at DESC";
        return new Promise((resolve, reject) => {
            database.query(query, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    }
};

export default review_models;