// gameData.js - Worker to fetch game data from the API and store it in the database

//import dependencies
import { connectEditDb, closeDb, runQueryWithRetry } from "../db.js";

// Delay function to wait for a specified number of milliseconds
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const gameData = async () => {
  try {
    //connect to the database
    const db = connectEditDb();
    //fetch game data from the API
    const response = await fetch(
      "https://api.steampowered.com/ISteamApps/GetAppList/v2/?key=" +
        process.env.STEAM_API_KEY
    );
    const data = await response.json();
    const games = data.applist.apps;
    //create variable to keep track of the number of games inserted
    let gamesInserted = 0;
    //insert the game data into the database in batches of 10,000
    for (let i = 0; i < games.length; i += 10000) {
      const batch = games.slice(i, i + 10000);
      for (const game of batch) {
        if (
          game.name !== null &&
          game.name !== "" &&
          game.name !== undefined &&
          game.name !== " "
        ) {
          await runQueryWithRetry(
            db,
            "INSERT INTO games (id, name) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING",
            [game.appid, game.name]
          );
          gamesInserted++;
          if (gamesInserted % 100 === 0) {
            console.log("Inserted " + gamesInserted + " games");
          }
        }
      }
      console.log(`Processed batch ${i / 10000 + 1}`);
      // Wait for 1 minute before processing the next batch
      await delay(5000);
    }
    //close the database connection
    closeDb(db);
    console.log("Game data fetched");
  } catch (error) {
    console.log("Error fetching game data");
  }
};

export default gameData;
