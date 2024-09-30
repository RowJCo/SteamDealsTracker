import { connectReadDb, closeDb, runQueryWithRetry } from "../config/db";

//collects all the games from the games table
const getGames = async (req, res) => {
    try {
        //connect to the database in read only mode
        const db = connectReadDb();
        if (!db) {
            console.error("Error connecting to the database");
            return;
        }
        //run a query to get all the games from the games table
        const result = await runQueryWithRetry(db, "SELECT * FROM games");
        //close the database connection
        closeDb(db);
        //send the games to the client
        res.status(200).send(result.rows);
    } catch (error) {
        console.error(error);
        res.status(400).send("Error getting games");
    }
};

//collects a specific game from the games table by game_name
const getGame = async (req,res) => {
    try {
        //connect to the database in read only mode
        const db = connectReadDb();
        if (!db) {
            console.error("Error connecting to the database");
            return;
        }
        //run a query to get the game from the games table by game_name
        const result = await runQueryWithRetry(db, "SELECT * FROM games WHERE game_name = $1", [req.params.game_name]);
        //close the database connection
        closeDb(db);
        //send the game to the client
        res.status(200).send(result.rows);  
    } catch (error) {
        console.error(error);
        res.status(400).send("Error getting game",);
    }
};