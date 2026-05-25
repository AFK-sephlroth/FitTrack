import review_models from "../models/reviewModels.js";

const review_controllers = {
    insert: async (request, response) => {
        try {
            const { user_id, username, rating, feedback } = request.body;
            const result = await review_models.addReview(user_id, username, rating, feedback || "");
            response.status(201).json({ message: "Review submitted!", insertId: result.insertId });
        } catch (error) {
            response.status(500).json({ message: `Error: ${error.message}` });
        }
    },

    get: async (_request, response) => {
        try {
            const result = await review_models.getReviews();
            response.status(200).json({ data: result });
        } catch (error) {
            response.status(500).json({ message: `Error: ${error.message}` });
        }
    }
};

export default review_controllers;