import database from "../configs/database.js";
import bcrypt from "bcrypt";

const user_models = {
    addUser: async (fullname, age, username, password) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = "INSERT INTO users (fullname, age, username, password, role, status, last_active) VALUES (?, ?, ?, ?, 'user', 'active', NOW())";
        return new Promise((resolve, reject) => {
            database.query(query, [fullname, age, username, hashedPassword], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    },

    findByUsername: async (username) => {
        const query = "SELECT * FROM users WHERE username = ?";
        return new Promise((resolve, reject) => {
            database.query(query, [username], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    },

    updateLastActive: async (id) => {
        const query = "UPDATE users SET last_active = NOW() WHERE id = ?";
        return new Promise((resolve, reject) => {
            database.query(query, [id], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    },

    getUsers: async () => {
        const query = "SELECT id, fullname, age, username, role, status, last_active FROM users";
        return new Promise((resolve, reject) => {
            database.query(query, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    },

    editUser: async (fullname, age, username, password, id) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = "UPDATE users SET fullname = ?, age = ?, username = ?, password = ? WHERE id = ?";
        return new Promise((resolve, reject) => {
            database.query(query, [fullname, age, username, hashedPassword, id], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    },

    toggleStatus: async (id, newStatus) => {
        const query = "UPDATE users SET status = ? WHERE id = ?";
        return new Promise((resolve, reject) => {
            database.query(query, [newStatus, id], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    },

    suspendInactiveUsers: async () => {
        const query = `
            UPDATE users
            SET status = 'suspended'
            WHERE role != 'admin'
              AND status = 'active'
              AND last_active < DATE_SUB(NOW(), INTERVAL 6 MONTH)
        `;
        return new Promise((resolve, reject) => {
            database.query(query, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    },

    deleteUser: async (id) => {
        const query = "DELETE FROM users WHERE id = ?";
        return new Promise((resolve, reject) => {
            database.query(query, [id], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    }
};

export default user_models;
