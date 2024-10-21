// gameController.js - retrieves game data from the database

//import dependencies
import { connectReadDb, closeDb, runQueryWithRetry } from "../utils/db.js";

const getGames = async (req, res) => {
  try {
    //connect to the database
    const db = connectReadDb();
    // get all games from the database
    const response = await runQueryWithRetry(db, "SELECT * FROM games");
    closeDb(db);
    return res.status(200).json({
      message: "Collected all game data",
      data: response.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Unable to get games" });
  }
};

const getGame = async (req, res) => {
  try {
    //connect to the database
    const db = connectReadDb();
    // get a game by name from the database
    const { name } = req.params;
    const response = await runQueryWithRetry(
      db,
      "SELECT * FROM games WHERE name LIKE '%' || $1 || '%' LIMIT 40",
      [name]
    );
    const data = response.rows;
    closeDb(db);
    return res.status(200).json({
      message: "Collected game data",
      data: response.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Unable to get game" });
  }
};

export { getGames, getGame };
