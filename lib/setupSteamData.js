//script to fetch game data from the steam api and insert it into the database so that users can search for games
import dotenv from "dotenv";
import {
  connectEditDb,
  closeDb,
  runQueryWithRetry,
} from "./db.js";

dotenv.config();
(async () => {
  try {
    //fetches the game data from the steam api
    console.log("Fetching game data from the Steam API.");
    let url =
      "https://api.steampowered.com/ISteamApps/GetAppList/v2/?key=" +
      process.env.STEAM_API_KEY;
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    let games = data.applist.apps;

    //inserts the game data into the database
    let db = await connectEditDb();
    for (let game of games) {
      let query = `INSERT INTO games (game_id, game_name) VALUES (?, ?) ON CONFLICT DO NOTHING`;
      await runQueryWithRetry(db, query, [game.appid, game.name]);
    }
    await closeDb(db);
    console.log("Game data inserted");
  } catch (error) {
    console.error("Error:", error);
  }
})();
