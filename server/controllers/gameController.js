//Imports dependencies
import pool from "../config/db.js";

//collects all steam games from the database
const getGames = async (req, res) => {
    try {
        const query = "SELECT * FROM games";
        const result = await pool.query(query);
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(400).json({ message: "Unable to get steam games" });
    }
};

//collects a specific steam game from the database
const getGame = async (req, res) => {
    try {
        const { game_name } = req.params;
        const query = "SELECT * FROM games WHERE game_name = $1";
        const values = [game_name];
        const result = await pool.query(query, values);
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(400).json({ message: "Unable to get steam game" });
    }
};

export default { getGames, getGame };
