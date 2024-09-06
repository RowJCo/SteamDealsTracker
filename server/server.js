//Imports dependencies
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cron from "node-cron";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import gameData from "./workers/gameData.js";
import gamePrices from "./workers/gamePrices.js";
import emailAlert from "./workers/emailAlert.js";
import setup from "./config/setup.js";
import checkAuth from "./middleware/checkAuth.js";
import userController from "./controllers/userController.js";
import gameController from "./controllers/gameController.js";
import userGameController from "./controllers/userGameController.js";

//sets up environment variables

dotenv.config()

//Sets up the express app
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('build'));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//sets up rate limiting

var limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // limit each IP to 100 requests per windowMs
	skipFailedRequests : true
})

app.set('trust proxy', 1 /* number of proxies between user and server */)
app.use(limiter);

//Routes

//User routes
app.post("/api/sign-up", userController.signUp);
app.post("/api/sign-in", userController.signIn);
app.get("/api/sign-out", userController.signOut);
app.get("/api/check-auth", checkAuth, userController.checkAuth);
app.delete("/api/del-user", checkAuth, userController.deleteUser);

//Game routes
app.get("/api/games", gameController.getGames);
app.get("/api/games/:game_name", gameController.getGame);

//User game routes
app.get("/api/user-games", checkAuth, userGameController.getUserGames);
app.post("/api/user-games", checkAuth, userGameController.addUserGame);
app.put("/api/user-games/:user_game_id", checkAuth, userGameController.updateUserGame);
app.delete("/api/user-games/:user_game_id", checkAuth, userGameController.deleteUserGame);
app.delete("/api/user-games/", checkAuth, userGameController.deleteUsersUserGames);

//Handles Static files
app.get('/*', function(_, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
});

//Starts the server
app.listen(process.env.SERVER_PORT, () => {
    console.log("Server is running on port "+process.env.SERVER_PORT);
    //initialises database and game data upon server start
    try {
        setup();
        console.log("Tables created");
    }
    catch (error) {
        console.error("Error setting up tables");
    }
    try {
        gameData();
    }
    catch (error) {
        console.error("Error updating game data");
    }
});

//Cron jobs

//gets the steam game data every day to update new games

cron.schedule("27 11 * * *", async () => {
    console.log("Updating game data");
    gameData();
});

//checks the game prices of user games every day

cron.schedule("40 11 * * *", async () => {
    console.log("Checking game prices");
    gamePrices();
});

//sends email alerts if the user's game price is below the threshold

cron.schedule("44 11 * * *", async () => {
    console.log("Sending email alerts");
    emailAlert();
});
