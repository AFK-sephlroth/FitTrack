import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import database from "./configs/database.js";
import router from "./routes/routes.js";

dotenv.config();
const app = express();

app.use(cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"]
}));
app.use(express.json());

app.use("/api", router);

const SERVER_PORT = process.env.SERVER_PORT ?? 5000;
app.listen(SERVER_PORT, (error) => {
    if (!error) {
        database;
        console.log(`FitTrack Backend listening on PORT: ${SERVER_PORT}`);
        return;
    }
    console.log(error);
});