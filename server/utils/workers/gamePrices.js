// gamePrice.js - Worker to fetch game prices from the API and store them in the database

// import dependencies
import { connectEditDb, closeDb, runQueryWithRetry } from "../db.js";

const gamePrices = async () => {
  try {
    //connect to the database
    const db = connectEditDb();
    //collect the game_ids from all the users_games
    const findGameIds = await runQueryWithRetry(
      db,
      "SELECT game_id FROM users_games"
    );
    //filter out duplicate game_ids
    const gameIds = findGameIds.rows
      .map((row) => row.game_id)
      .filter((game_id, index, self) => self.indexOf(game_id) === index);
    //fetch game prices from the API
    const response = await fetch(
      "https://store.steampowered.com/api/appdetails/?appids=" +
        gameIds.join(",") +
        "&&filters=price_overview" +
        "&&key=" +
        process.env.STEAM_KEY
    );
    const data = await response.json();
    //insert the game prices into the database
    for (const key of Object.keys(data)) {
      const game = data[key];
      if (game.success && game.data.price_overview) {
        const price = game.data.price_overview;
        await runQueryWithRetry(
          db,
          "UPDATE games set price_final = $1, price_formatted = $2 WHERE id = $3",
          [price.final, price.final_formatted, key]
        );
      } else {
        console.log("Game has no price data");
      }
    }
    //close the database connection
    closeDb(db);
    console.log("Game prices fetched");
  } catch (error) {
    console.log("Error fetching game prices");
  }
};

export default gamePrices;
