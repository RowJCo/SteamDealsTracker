import pool from "../config/db.js";

const getGames = async (req, res) => {
    try {
        const query = "SELECT * FROM games";
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};

const getGame = async (req, res) => {
    try {
        const { game_name } = req.params;
        const query = "SELECT * FROM games WHERE game_name = $1";
        const values = [game_name];
        const result = await pool.query(query, values);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};

export default { getGames, getGame };
