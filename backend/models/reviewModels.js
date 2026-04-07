import database from "../configs/database.js";

const review_models = {
    addReview: async (username, rating, feedback) => {
        const query = "INSERT INTO reviews (username, rating, feedback) VALUES (?, ?, ?)";
        return new Promise((resolve, reject) => {
            database.query(query, [username, rating, feedback], (error, result) => {
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