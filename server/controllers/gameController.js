import pool from "../config/db.js";

const getGames = async (req, res) => {
    try {
        const query = "SELECT * FROM games";
        const result = await pool.query(query);
        res.json(result.rows);
        res.status(200).json({ message: "Games retrieved" });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};

const getGame = async (req, res) => {
    try {
        const { game_id } = req.params;
        const query = "SELECT * FROM games WHERE game_id = $1";
        const values = [game_id];
        const result = await pool.query(query, values);
        res.json(result.rows);
        res.status(200).json({ message: "Game retrieved" });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};

export default { getGames, getGame };
