// userRoutes.js - create routes for interacting with the users table

//import dependencies
import express from "express";
import {
  createUser,
  deleteUser,
  authUser,
  unAuthUser,
  hasAuth,
} from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";

//create a router
const router = express.Router();

//define routes
router.post("/api/users", createUser);
router.delete("/api/users", checkAuth, deleteUser);
router.post("/api/auth", authUser);
router.get("/api/auth", checkAuth, unAuthUser);
router.get("/api/auth/check", checkAuth, hasAuth);

export default router;
