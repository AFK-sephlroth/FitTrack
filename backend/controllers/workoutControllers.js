import workout_models from "../models/workoutModels.js";

const workout_controllers = {
    insert: async (request, response) => {
        try {
            const { name, reps, sets } = request.body;
            const result = await workout_models.addWorkout(name, reps, sets);
            if (result) {
                response.status(201).json({ message: "Workout added!", insertId: result.insertId });
                return;
            }
            throw Error("Insert failed");
        } catch (error) {
            response.status(500).json({ message: `Error: ${error.message}` });
        }
    },

    get: async (_request, response) => {
        try {
            const result = await workout_models.getWorkouts();
            response.status(200).json({ data: result });
        } catch (error) {
            response.status(500).json({ message: `Error: ${error.message}` });
        }
    },

    edit: async (request, response) => {
        try {
            const id = request.params.id;
            const { name, reps, sets } = request.body;
            const result = await workout_models.editWorkout(name, reps, sets, id);
            if (result.affectedRows === 1) {
                response.status(200).json({ message: "Workout updated successfully" });
            } else {
                response.status(404).json({ message: "Workout does not exist" });
            }
        } catch (error) {
            response.status(500).json({ message: `Error: ${error.message}` });
        }
    },

    delete: async (request, response) => {
        try {
            const id = request.params.id;
            const result = await workout_models.deleteWorkout(id);
            if (result.affectedRows === 1) {
                response.status(200).json({ message: "Workout deleted successfully" });
            } else {
                response.status(404).json({ message: "Workout does not exist" });
            }
        } catch (error) {
            response.status(500).json({ message: `Error: ${error.message}` });
        }
    }
};

export default workout_controllers;