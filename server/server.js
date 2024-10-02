//Imports node modules
import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import path from "path";
import csrf from "lusca";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

//Imports custom modules

//modules needed to setup the database
import { createDb } from "./config/db.js";
import gameData from "./workers/gameData.js";

//middleware
import rateLimiter from "./middleware/rateLimiter.js";
import checkAuth from "./middleware/checkAuth.js";

//controllers
import userController from "./controllers/userController.js";
import gameController from "./controllers/gameController.js";
import userGameController from "./controllers/userGameController.js";

//sets up environment variables
dotenv.config();

//creates an express app and configures it
const app = express();
app.use(express.json());
app.use(csrf());
app.use(rateLimiter);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        httpOnly: true,
    }
}));
app.use(express.static('build'));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//sets up the routes

//user routes
app.post("/api/sign-up", userController.signUp);
app.post("/api/sign-in", userController.signIn);
app.get("/api/sign-out", userController.signOut);
app.delete("/api/del-user", checkAuth, userController.deleteUser);
app.get("/api/check-auth", checkAuth, userController.checkAuth);

//game routes
app.get("/api/games", checkAuth, gameController.getGames);
app.get("/api/games/:game_name", checkAuth, gameController.getGame);

//user game routes
app.get("/api/user-games", checkAuth, userGameController.getUserGames);
app.post("/api/user-games", checkAuth, userGameController.addUserGame);
app.put("/api/user-games/:user_game_id", checkAuth, userGameController.updateUserGame);
app.delete("/api/user-games/:user_game_id", checkAuth, userGameController.deleteUserGame);
app.delete("/api/user-games/", checkAuth, userGameController.deleteUsersUserGames);

//static file routes
//app.get('/*', function(_, res) {
    //res.sendFile(path.join(__dirname, '/build/index.html'), function(err) {
      //if (err) {
        //res.status(500).send(err)
      //}
    //})
//});


//sets up the server
app.listen(process.env.SERVER_PORT, async () => {
    console.log("Server is running on port "+process.env.SERVER_PORT);
    try{
        await createDb();
    } catch (error) {
        console.error(error);
    }
    try{
        await gameData();
    } catch (error) {
        console.error(error);
    }
});