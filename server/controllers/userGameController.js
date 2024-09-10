//Imports dependencies
import pool from "../config/db.js";

//collects all user games from the database
const getUserGames = async (req, res) => {
    try {
        const { user_id } = req;
        const query = `
            SELECT * FROM users_games
            JOIN games ON users_games.game_id = games.game_id
            WHERE user_id = $1
        `;
        const values = [user_id];
        const result = await pool.query(query, values);
        return res.status(200).json(result.rows);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ message: error.message });
    }
};

//adds a user game to the database
const addUserGame = async (req, res) => {
    try {
        const { user_id } = req;
        const { game_id, game_name, buyprice } = req.body;
        const query = "INSERT INTO users_games (user_id, game_id, game_name, buyprice) VALUES ($1, $2, $3, $4) RETURNING *";
        const values = [user_id, game_id, game_name, buyprice];
        await pool.query(query, values);
        return res.status(201).json({ message: "User game created" });
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ message: error.message });
    }
};

//updates a user game in the database
const updateUserGame = async (req, res) => {
    try {
        const { user_id } = req;
        const { user_game_id } = req.params;
        const { buyprice } = req.body;
        const query = "UPDATE users_games SET buyprice = $1 WHERE user_id = $2 AND user_game_id = $3 RETURNING *";
        const values = [buyprice, user_id, user_game_id];
        await pool.query(query, values);
        return res.status(200).json({ message: "User game updated" });
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ message: error.message });
    }
};

//deletes a user game from the database
const deleteUserGame = async (req, res) => {
    try {
        const { user_id } = req;
        const { user_game_id } = req.params;
        const query = "DELETE FROM users_games WHERE user_id = $1 AND user_game_id = $2";
        const values = [user_id, user_game_id];
        await pool.query(query, values);
        return res.status(200).json({ message: "User game deleted" });
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ message: error.message });
    }
};

//deletes all user games from the database for a specific user
const deleteUsersUserGames = async (req, res) => {
    try {
        const { user_id } = req;
        const query = "DELETE FROM users_games WHERE user_id = $1";
        const values = [user_id];
        await pool.query(query, values);
        return res.status(200).json({ message: "All users user games deleted" });
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ message: error.message });
    }
};

export default { getUserGames, addUserGame, updateUserGame, deleteUserGame, deleteUsersUserGames };
