import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const database = mysql.createConnection({
    host:     process.env.HOST     || "localhost",
    user:     process.env.USER     || "root",
    password: process.env.PASSWORD || "",
    port:     process.env.PORT     || 3306,
    database: process.env.DATABASE || "fittrack"
});

database.connect((error) => {
    if (error) {
        console.log(`Database Connection Error: ${error}`);
        return;
    }
    console.log(`FitTrack Database Connected. ThreadID: ${database.threadId}`);
});

export default database;