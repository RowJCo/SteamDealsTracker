import pool from "./config/db.js";


const setup = async () => {
        try {
            const query = `
                CREATE TABLE IF NOT EXISTS users (
                    user_id SERIAL PRIMARY KEY,
                    email TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL
                );
                CREATE TABLE IF NOT EXISTS games (
                    game_id INTEGER PRIMARY KEY,
                    game_name TEXT UNIQUE NOT NULL,
                    price INTEGER NULL
                );
                CREATE TABLE IF NOT EXISTS users_games (
                    user_game_id SERIAL PRIMARY KEY,
                    user_id INT REFERENCES users(user_id),
                    game_id INT REFERENCES games(game_id),
                    game_name TEXT REFERENCES games(game_name),
                    buyprice INTEGER NOT NULL
                );
            `;
            await pool.query(query);
            return "Tables created";
        } catch (error) {
            console.error(error.message);
            return "Tables not created";
        }
}

export default setup;
