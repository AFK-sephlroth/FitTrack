import jwt from "jsonwebtoken";
import user_models from "../models/userModels.js";

const authenticate = async (request, response, next) => {
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) {
        response.status(401).json({ message: "No token provided." });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "fittrack_secret");
        // Fetch the full user record so we have the numeric id
        const rows = await user_models.findByUsername(decoded.username);
        if (rows.length === 0) {
            response.status(401).json({ message: "User not found." });
            return;
        }
        request.user = rows[0]; // { id, fullname, age, username, role, … }
        next();
    } catch {
        response.status(401).json({ message: "Invalid or expired token." });
    }
};

export default authenticate;
