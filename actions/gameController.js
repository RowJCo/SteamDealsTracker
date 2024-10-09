import { connectReadDb, closeDb, runQueryWithRetry } from "../lib/db";
import { getCookieData } from "../lib/getCookieData";

export const getWishlist = async function () {
  const user = await getCookieData();
  //get the userGames associated with the user
  let db = await connectReadDb();
  const userQuery = "SELECT * FROM users_games WHERE user_id = ?";
  const userGames = await runQueryWithRetry(db, userQuery, [user.id]);
  await closeDb(db);
  //if there are no games in the wishlist return a success false
  if (!userGames.length) {
    return { userGames: [], success: false };
  }
  //get the price_final_formatted for each game
  db = await connectReadDb();
  const gameIds = userGames.map((game) => game.game_id);
  const priceQuery = `SELECT game_id, price_final_formatted FROM games WHERE game_id IN (${gameIds.join(
    ","
  )})`;
  const priceData = await runQueryWithRetry(db, priceQuery);
  await closeDb(db);
  //merge the price_final_formatted with the userGames
  const priceMap = new Map(
    priceData.map((item) => [item.game_id, item.price_final_formatted])
  );
  userGames.forEach((game) => {
    game.price_final_formatted = priceMap.get(game.game_id) || null;
  });

  return { userGames, success: true };
};
