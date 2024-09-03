//Imports dependencies
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cron from "node-cron";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import gameData from "./workers/gameData.js";
import gamePrices from "./workers/gamePrices.js";
import emailAlert from "./workers/emailAlert.js";
import pool from "./config/db.js";
import checkAuth from "./middleware/checkAuth.js";
import userController from "./controllers/userController.js";
import gameController from "./controllers/gameController.js";
import userGameController from "./controllers/userGameController.js";

dotenv.config()

//Sets up the express app
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('build'));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//for local development only
app.get("/api/setupDB", async (req, res) => {
    try {
        const query = `
                    CREATE TABLE IF NOT EXISTS users (
                        user_id SERIAL PRIMARY KEY,
                        email TEXT UNIQUE NOT NULL,
                        password TEXT NOT NULL
                    );
                    CREATE TABLE IF NOT EXISTS games (
                        game_id INTEGER PRIMARY KEY,
                        game_name TEXT UNIQUE NOT NULL,
                        price INTEGER NULL
                    );
                    CREATE TABLE IF NOT EXISTS users_games (
                        user_game_id SERIAL PRIMARY KEY,
                        user_id INT REFERENCES users(user_id),
                        game_id INT REFERENCES games(game_id),
                        game_name TEXT REFERENCES games(game_name),
                        buyprice INTEGER NOT NULL
                    );
                `;
        await pool.query(query);
        res.send("Tables created");
    } catch (error) {
        console.error(error.message);
        res.send("Tables not created");
    }
});

//Routes

//User routes
app.post("/api/sign-up", userController.signUp);
app.post("/api/sign-in", userController.signIn);
app.get("/api/sign-out", userController.signOut);
app.get("/api/check-auth", checkAuth, userController.checkAuth);

//Game routes
app.get("/api/games", gameController.getGames);
app.get("/api/games/:game_name", gameController.getGame);

//User game routes
app.get("/api/user-games", checkAuth, userGameController.getUserGames);
app.post("/api/user-games", checkAuth, userGameController.addUserGame);
app.put("/api/user-games/:user_game_id", checkAuth, userGameController.updateUserGame);
app.delete("/api/user-games/:user_game_id", checkAuth, userGameController.deleteUserGame);

//Handles Static files
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
});

//Starts the server
app.listen(process.env.SERVER_PORT, () => {
    console.log("Server is running on port "+process.env.SERVER_PORT);
});

//Cron jobs
cron.schedule("44 16 * * *", async () => {
    console.log("Updating game data");
    gameData();
});

cron.schedule("09 17 * * *", async () => {
    console.log("Checking game prices");
    gamePrices();
});

cron.schedule("43 17 * * *", async () => {
    console.log("Sending email alerts");
    emailAlert();
});
