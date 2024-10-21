// userGameRoutes.js - create routes for interacting with the users_games table

//import dependencies
import express from "express";
import {
  getUserGames,
  addUserGame,
  deleteUserGame,
} from "../controllers/userGameController.js";
import checkAuth from "../middleware/checkAuth.js";

//create a router
const router = express.Router();

//define routes
router.get("/api/user-games", checkAuth, getUserGames);
router.post("/api/user-games", checkAuth, addUserGame);
router.delete("/api/user-games/:id", checkAuth, deleteUserGame);

export default router;
