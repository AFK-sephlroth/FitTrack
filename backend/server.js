import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import database from "./configs/database.js";
import router from "./routes/routes.js";
import user_models from "./models/userModels.js";

dotenv.config();
const app = express();

app.use(cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"]
}));
app.use(express.json());

app.use("/api", router);

// ── Auto-suspend users inactive for 6+ months ───────────────────
// Runs once on startup, then every 6 hours
const runInactivityCheck = async () => {
    try {
        const result = await user_models.suspendInactiveUsers();
        if (result.affectedRows > 0) {
            console.log(`[Auto-Suspend] Suspended ${result.affectedRows} inactive user(s)`);
        }
    } catch (err) {
        console.error(`[Auto-Suspend Error] ${err.message}`);
    }
};

const SIX_HOURS_MS = 6 * 60 * 60 * 1000;

const SERVER_PORT = process.env.SERVER_PORT ?? 5000;
app.listen(SERVER_PORT, async (error) => {
    if (!error) {
        database;
        console.log(`FitTrack Backend listening on PORT: ${SERVER_PORT}`);
        await runInactivityCheck();
        setInterval(runInactivityCheck, SIX_HOURS_MS);
        return;
    }
    console.log(error);
});
