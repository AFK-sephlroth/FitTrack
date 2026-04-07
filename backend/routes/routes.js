import express from "express";
import user_controllers from "../controllers/userControllers.js";
import goal_controllers from "../controllers/goalControllers.js";
import workout_controllers from "../controllers/workoutControllers.js";

const router = express.Router();

/* ── User / Auth Routes ─────────────────────────────────────────── */
router.post("/signup", user_controllers.signup);
router.post("/login",  user_controllers.login);
router.get("/users",             user_controllers.get);
router.put("/users/:id",         user_controllers.edit);
router.delete("/users/:id",      user_controllers.delete);

/* ── Goal Routes ────────────────────────────────────────────────── */
router.post("/goals",        goal_controllers.insert);
router.get("/goals",         goal_controllers.get);
router.put("/goals/:id",     goal_controllers.edit);
router.delete("/goals/:id",  goal_controllers.delete);

/* ── Workout Routes ─────────────────────────────────────────────── */
router.post("/workouts",        workout_controllers.insert);
router.get("/workouts",         workout_controllers.get);
router.put("/workouts/:id",     workout_controllers.edit);
router.delete("/workouts/:id",  workout_controllers.delete);

export default router;