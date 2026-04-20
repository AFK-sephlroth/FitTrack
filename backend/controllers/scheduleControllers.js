import schedule_models from "../models/scheduleModels.js";

const schedule_controllers = {
    insert: async (request, response) => {
        try {
            const { date_key, event } = request.body;
            const user_id = request.user.id;
            const result = await schedule_models.addSchedule(date_key, event, user_id);
            response.status(201).json({ message: "Event added!", insertId: result.insertId });
        } catch (error) {
            response.status(500).json({ message: `Error: ${error.message}` });
        }
    },

    get: async (request, response) => {
        try {
            const user_id = request.user.id;
            const result = await schedule_models.getSchedules(user_id);
            response.status(200).json({ data: result });
        } catch (error) {
            response.status(500).json({ message: `Error: ${error.message}` });
        }
    },

    delete: async (request, response) => {
        try {
            const id = request.params.id;
            const user_id = request.user.id;
            const result = await schedule_models.deleteSchedule(id, user_id);
            if (result.affectedRows === 1) {
                response.status(200).json({ message: "Event deleted successfully" });
            } else {
                response.status(404).json({ message: "Event does not exist" });
            }
        } catch (error) {
            response.status(500).json({ message: `Error: ${error.message}` });
        }
    }
};

export default schedule_controllers;
