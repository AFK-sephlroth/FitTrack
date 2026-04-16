import goal_models from "../models/goalModels.js";

const goal_controllers = {
    insert: async (request, response) => {
        try {
            const { goal } = request.body;
            const user_id = request.user.id;
            const result = await goal_models.addGoal(goal, user_id);
            if (result) {
                response.status(201).json({ message: "Goal added!", insertId: result.insertId });
                return;
            }
            throw Error("Insert failed");
        } catch (error) {
            response.status(500).json({ message: `Error: ${error.message}` });
        }
    },

    get: async (request, response) => {
        try {
            const user_id = request.user.id;
            const result = await goal_models.getGoals(user_id);
            response.status(200).json({ data: result });
        } catch (error) {
            response.status(500).json({ message: `Error: ${error.message}` });
        }
    },

    edit: async (request, response) => {
        try {
            const id = request.params.id;
            const { goal } = request.body;
            const user_id = request.user.id;
            const result = await goal_models.editGoal(goal, id, user_id);
            if (result.affectedRows === 1) {
                response.status(200).json({ message: "Goal updated successfully" });
            } else {
                response.status(404).json({ message: "Goal does not exist" });
            }
        } catch (error) {
            response.status(500).json({ message: `Error: ${error.message}` });
        }
    },

    delete: async (request, response) => {
        try {
            const id = request.params.id;
            const user_id = request.user.id;
            const result = await goal_models.deleteGoal(id, user_id);
            if (result.affectedRows === 1) {
                response.status(200).json({ message: "Goal deleted successfully" });
            } else {
                response.status(404).json({ message: "Goal does not exist" });
            }
        } catch (error) {
            response.status(500).json({ message: `Error: ${error.message}` });
        }
    }
};

export default goal_controllers;
