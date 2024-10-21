// gameRoutes.js - create routes for interacting with the games table

//import dependencies
import express from "express";
import { getGames, getGame } from "../controllers/gameController.js";
import checkAuth from "../middleware/checkAuth.js";

//create a router
const router = express.Router();

//define routes
router.get("/api/games", checkAuth, getGames);
router.get("/api/games/:name", checkAuth, getGame);

export default router;
