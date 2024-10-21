// server.js - create the server and setup the middleware, routes and database

// setup the environment variables
import dotenv from "dotenv";
dotenv.config();

//import dependencies
import express from "express";
import cookieParser from "cookie-parser";
import { createDb } from "./utils/db.js";

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

//import middleware
import rateLimiter from "./middleware/rateLimiter.js";

//import workers
import gameData from "./utils/workers/gameData.js";
import scheduleJobs from "./utils/scheduleJobs.js";

//setup the express app
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(rateLimiter);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "build")));

//import routes
import userRoutes from "./routes/userRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import userGameRoutes from "./routes/userGameRoutes.js";

//use the routes
app.use(userRoutes);
app.use(gameRoutes);
app.use(userGameRoutes);

//Handles Static files
app.get("/*", function (_, res) {
  res.sendFile(path.join(__dirname, "/build/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

//start the server
app.listen(process.env.SERVER_PORT, async () => {
  console.log("Server is running on port " + process.env.SERVER_PORT);
  //initialises database , game data and workers upon server start
  try {
    await createDb();
  } catch (error) {
    console.log("Error creating database");
  }
  try {
    await gameData();
  } catch (error) {
    console.log("Error fetching game data");
  }
  try {
    scheduleJobs();
  } catch (error) {
    console.log("Error scheduling jobs");
  }
});
