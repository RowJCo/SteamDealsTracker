import pool from "../config/db.js";

const gamePrices = async () => {
    try {
        const query = "SELECT game_id FROM users_games";
        const result = await pool.query(query);
        let games = result.rows;
        games = games.filter((game, index, self) => self.findIndex(t => t.game_id === game.game_id) === index);
        console.log("Games to update: " + games.length);
        let allGameIds = [];
        for (const game of games) {
            console.log("Adding game to list: " + game.game_id);
            allGameIds.push(game.game_id);
        }
        if (allGameIds.length > 0) {
            console.log("Fetching prices for all games");
            const response = await fetch("https://store.steampowered.com/api/appdetails/?appids=" + allGameIds.join(",") + "&&filters=price_overview" + "&&key=" + process.env.STEAM_KEY);
            const data = await response.json();
            for (const key of Object.keys(data)) {
                const game = data[key];
                if (game.success && game.data.price_overview) {
                    const price = game.data.price_overview.final;
                    console.log("Updating price for game: " + key + " to " + price);
                    const query = "UPDATE games SET price = $1 WHERE game_id = $2";
                    const values = [price, key];
                    await pool.query(query, values);
                } else {
                    console.log(`Price overview not available for game: ${key}`);
                }
            }
        }       
        console.log("Game prices updated");
    } catch (error) {
        console.error(error);
    }
};

export default gamePrices;
