// userGameController.js - perform CRD operations on the users_games table

// import dependencies
import {
  connectEditDb,
  connectReadDb,
  closeDb,
  runQueryWithRetry,
} from "../utils/db.js";

const getUserGames = async (req, res) => {
  try {
    //connect to the database
    const db = connectReadDb();
    // get the user_id from the request object
    const { user_id } = req;
    // get all user games from the database
    const response = await runQueryWithRetry(
      db,
      "SELECT * FROM users_games WHERE user_id = $1",
      [user_id]
    );
    closeDb(db);
    // return the user games
    return res.status(200).json({
      message: "Collected all price notifications",
      data: response.rows,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Unable to get price notifications" });
  }
};

const addUserGame = async (req, res) => {
  try {
    //connect to the database
    const db = connectEditDb();
    // get the user_id from the request object
    const { user_id } = req;
    // get game_id, game_name, and buy_price from the request body
    const { game_id, game_name, buy_price } = req.body;
    // insert the game into the database
    const response = await runQueryWithRetry(
      db,
      "INSERT INTO users_games (user_id, game_id, game_name, buy_price) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, game_id, game_name, buy_price]
    );
    closeDb(db);
    // return the game data
    return res.status(201).json({
      message: "Added price notification",
      data: response.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Unable to add game" });
  }
};

const deleteUserGame = async (req, res) => {
  try {
    //connect to the database
    const db = connectEditDb();
    // get the user_id from the request object
    const { user_id } = req;
    // get the id from the request parameters
    const { id } = req.params;
    // delete the game from the database
    const response = await runQueryWithRetry(
      db,
      "DELETE FROM users_games WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, user_id]
    );
    closeDb(db);
    // return the game data
    return res.status(200).json({
      message: "Deleted price notification",
      data: response.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Unable to delete game" });
  }
};

export { getUserGames, addUserGame, deleteUserGame };
