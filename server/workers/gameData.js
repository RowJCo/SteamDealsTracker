//Imports custom modules
import { connectEditDb, closeDb, runQueryWithRetry } from "../config/db.js";

//collects all steam game data from the steam web api
const gameData = async () => {
    try{
        //sends a get fetch request to the steam web api for the first 50000 games
        const response = await fetch("https://api.steampowered.com/IStoreService/GetAppList/v1/?key="+process.env.STEAM_KEY+"&include_games=true&include_dlc=true&max_results=50000");
        const data = await response.json();
        let games = data.response.apps;
        //open the database in readwrite mode
        const db = connectEditDb();
        if (!db) {
            console.error("Error connecting to the database");
            return;
        }
        //inserts the game data into the games table
        for (const game of games) {
            try {
                //insert the game data into the games table
                await runQueryWithRetry(db, `INSERT INTO games (game_id, game_name) VALUES (?, ?) ON CONFLICT DO NOTHING`, [game.appid, game.name]);
            } catch (error) {
                console.error(error.message);
            }
        }
        //close the database connection
        closeDb(db);
        console.log("Batch 1 of game data inserted");
        //iterates over the games in increments of 50000 until all games are inserted into the games table
        let batchNum = 2;
        let length = games.length;
        let last_id = data.response.last_appid;
        while (length === 50000) {
            const response = await fetch("https://api.steampowered.com/IStoreService/GetAppList/v1/?key="+process.env.STEAM_KEY+"&include_games=true&include_dlc=true&max_results=50000&last_appid="+last_id);
            const data = await response.json();
            games = data.response.apps;
            //open the database in readwrite mode
            const db = connectEditDb();
            if (!db) {
                console.error("Error connecting to the database");
                return;
            }
            //inserts the game data into the games table
            for (const game of games) {
                try {
                    //insert the game data into the games table
                    await runQueryWithRetry(db, `INSERT INTO games (game_id, game_name) VALUES (?, ?) ON CONFLICT DO NOTHING`, [game.appid, game.name]);
                } catch (error) {
                    console.error(error.message);
                }
            }
            //close the database connection
            closeDb(db);
            last_id = data.response.last_appid;
            length = games.length;
            console.log("Batch "+batchNum+" of game data inserted");
            batchNum++;
        }
        console.log("Game data updated");
    } catch (error) {
        console.error(error);
    }
}

export default gameData;