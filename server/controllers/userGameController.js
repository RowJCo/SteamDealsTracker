import pool from "../config/db.js";

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
        res.json(result.rows);
        res.status(200).json({ message: "User games retrieved" });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};

const addUserGame = async (req, res) => {
    try {
        const { user_id } = req;
        const { game_id, buyprice } = req.body;
        const query = "INSERT INTO users_games (user_id, game_id, buyprice) VALUES ($1, $2, $3) RETURNING *";
        const values = [user_id, game_id, buyprice];
        await pool.query(query, values);
        res.status(201).json({ message: "User game created" });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};

const updateUserGame = async (req, res) => {
    try {
        const { user_id } = req;
        const { user_game_id } = req.params;
        const { buyprice } = req.body;
        const query = "UPDATE users_games SET buyprice = $1 WHERE user_id = $2 AND user_game_id = $3 RETURNING *";
        const values = [buyprice, user_id, user_game_id];
        await pool.query(query, values);
        res.status(200).json({ message: "User game updated" });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};

const deleteUserGame = async (req, res) => {
    try {
        const { user_id } = req;
        const { user_game_id } = req.params;
        const query = "DELETE FROM users_games WHERE user_id = $1 AND user_game_id = $2";
        const values = [user_id, user_game_id];
        await pool.query(query, values);
        res.status(200).json({ message: "User game deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};

export default { getUserGames, addUserGame, updateUserGame, deleteUserGame };