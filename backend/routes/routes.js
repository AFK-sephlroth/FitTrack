import express from "express";
import user_controllers     from "../controllers/userControllers.js";
import goal_controllers     from "../controllers/goalControllers.js";
import workout_controllers  from "../controllers/workoutControllers.js";
import schedule_controllers from "../controllers/scheduleControllers.js";
import review_controllers   from "../controllers/reviewControllers.js";
import jwt from "jsonwebtoken";

const router = express.Router();

/* ── Auth Verification (used by PrivateRoutes) ──────────────────── */
router.get("/protected", (request, response) => {
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) {
        response.status(401).json({ valid: false });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "fittrack_secret");
        response.status(200).json({ valid: true, user: decoded });
    } catch {
        response.status(401).json({ valid: false });
    }
});

/* ── User / Auth Routes ─────────────────────────────────────────── */
router.post("/signup",           user_controllers.signup);
router.post("/login",            user_controllers.login);
router.get("/users",             user_controllers.get);
router.put("/users/:id",         user_controllers.edit);
router.delete("/users/:id",      user_controllers.delete);

/* ── Goal Routes ────────────────────────────────────────────────── */
router.post("/goals",            goal_controllers.insert);
router.get("/goals",             goal_controllers.get);
router.put("/goals/:id",         goal_controllers.edit);
router.delete("/goals/:id",      goal_controllers.delete);

/* ── Workout Routes ─────────────────────────────────────────────── */
router.post("/workouts",         workout_controllers.insert);
router.get("/workouts",          workout_controllers.get);
router.put("/workouts/:id",      workout_controllers.edit);
router.delete("/workouts/:id",   workout_controllers.delete);

/* ── Schedule Routes ────────────────────────────────────────────── */
router.post("/schedules",        schedule_controllers.insert);
router.get("/schedules",         schedule_controllers.get);
router.delete("/schedules/:id",  schedule_controllers.delete);

/* ── Review / Feedback Routes ───────────────────────────────────── */
router.post("/reviews",          review_controllers.insert);
router.get("/reviews",           review_controllers.get);

export default router;