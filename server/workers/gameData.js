import pool from "../config/db.js";

const gameData = async () => {
    try {
        const response = await fetch("https://api.steampowered.com/IStoreService/GetAppList/v1/?key="+process.env.STEAM_KEY+"&include_games=true&include_dlc=true&max_results=50000");
        const data = await response.json();
        let games = data.response.apps;
        const query = "INSERT INTO games (game_id, game_name) VALUES ($1, $2) ON CONFLICT DO NOTHING";
        games.forEach(async game => {
            const values = [game.appid, game.name];
            await pool.query(query, values);
        });
        let length = games.length;
        let last_id = data.response.last_appid;
        while (length === 50000) {
            const response = await fetch("https://api.steampowered.com/IStoreService/GetAppList/v1/?key="+process.env.STEAM_KEY+"&include_games=true&include_dlc=true&max_results=50000&last_appid="+last_id);
            const data = await response.json();
            games = data.response.apps;
            games.forEach(async game => {
                const values = [game.appid, game.name];
                await pool.query(query, values);
            });
            last_id = data.response.last_appid;
            length = games.length;
        }
        console.log("Game data updated");
    } catch (error) {
        console.error(error.message);
    }
};

export default gameData;