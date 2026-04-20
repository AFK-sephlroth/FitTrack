import user_models from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const user_controllers = {
    signup: async (request, response) => {
        try {
            const { fullname, age, username, password } = request.body;

            const existing = await user_models.findByUsername(username);
            if (existing.length > 0) {
                response.status(409).json({ message: "Username already exists!" });
                return;
            }

            const result = await user_models.addUser(fullname, age, username, password);
            if (result) {
                const token = jwt.sign({ username }, process.env.JWT_SECRET || "fittrack_secret", { expiresIn: "1d" });
                const user = { id: result.insertId, fullname, age, username, role: "user", status: "active" };
                response.status(201).json({ message: "Account created!", token, user });
                return;
            }
            throw Error("Signup failed");
        } catch (error) {
            response.status(500).json({ message: `Error: ${error.message}` });
        }
    },

    login: async (request, response) => {
        try {
            const { username, password } = request.body;

            const result = await user_models.findByUsername(username);
            if (result.length === 0) {
                response.status(404).json({ message: "User not found!" });
                return;
            }

            const user = result[0];

            // Block suspended users
            if (user.status === "suspended") {
                response.status(403).json({ message: "Your account has been suspended. Please contact the admin." });
                return;
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                response.status(401).json({ message: "Incorrect password!" });
                return;
            }

            // Refresh last_active on every successful login
            await user_models.updateLastActive(user.id);

            const token = jwt.sign({ username }, process.env.JWT_SECRET || "fittrack_secret", { expiresIn: "1d" });
            const { password: _, ...safeUser } = user;
            response.status(200).json({ message: "Login successful!", token, user: safeUser });
        } catch (error) {
            response.status(500).json({ message: `Error: ${error.message}` });
        }
    },

    get: async (_request, response) => {
        try {
            const result = await user_models.getUsers();
            response.status(200).json({ data: result });
        } catch (error) {
            response.status(500).json({ message: `Error: ${error.message}` });
        }
    },

    edit: async (request, response) => {
        try {
            const id = request.params.id;
            const { fullname, age, username, password } = request.body;
            const result = await user_models.editUser(fullname, age, username, password, id);
            if (result.affectedRows === 1) {
                response.status(200).json({ message: "User updated successfully" });
            } else {
                response.status(404).json({ message: "User does not exist" });
            }
        } catch (error) {
            response.status(500).json({ message: `Error: ${error.message}` });
        }
    },

    toggleStatus: async (request, response) => {
        try {
            const id = request.params.id;
            const { status } = request.body;  // "active" | "suspended"
            const result = await user_models.toggleStatus(id, status);
            if (result.affectedRows === 1) {
                const action = status === "suspended" ? "suspended" : "reactivated";
                response.status(200).json({ message: `User ${action} successfully` });
            } else {
                response.status(404).json({ message: "User does not exist" });
            }
        } catch (error) {
            response.status(500).json({ message: `Error: ${error.message}` });
        }
    },

    delete: async (request, response) => {
        try {
            const id = request.params.id;
            const result = await user_models.deleteUser(id);
            if (result.affectedRows === 1) {
                response.status(200).json({ message: "User deleted successfully" });
            } else {
                response.status(404).json({ message: "User does not exist" });
            }
        } catch (error) {
            response.status(500).json({ message: `Error: ${error.message}` });
        }
    }
};

export default user_controllers;
