import { connectEditDb, connectReadDb, closeDb, runQueryWithRetry } from "../config/db";

//collects all user games from the users_games table
const getUserGames = async (req, res) => {
    try{
        //connect to the database in read only mode
        const db = connectReadDb();
        if (!db) {
            console.error("Error connecting to the database");
            return;
        }
        //run a query to get all the user games from the users_games table
        const result = await runQueryWithRetry(db, "SELECT * FROM users_games JOIN games ON users_games.game_id = games.game_id WHERE user_id = $1", [req.user_id]);
        //close the database connection
        closeDb(db);
        //send the user games to the client
        res.status(200).send(result.rows);
    } catch (error) {
        console.error(error);
        res.status(400).send("Error getting user games");
    }
};

//adds a user game to the users_games table
const addUserGame = async (req, res) => {
    try {
        //connect to the database in write mode
        const db = connectEditDb();
        if (!db) {
            console.error("Error connecting to the database");
            return;
        }
        //run a query to add a user game to the users_games table
        const result = await runQueryWithRetry(db, "INSERT INTO users_games (user_id, game_id, game_name, buyprice) VALUES ($1, $2, $3, $4)", [req.user_id, req.body.game_id, req.body.game_name, req.body.buyprice]);
        //close the database connection
        closeDb(db);
        //send the result to the client
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(400).send("Error adding user game");
    }
};

//deletes a user game from the users_games table
const deleteUserGame = async (req, res) => {
    try {
        //connect to the database in write mode
        const db = connectEditDb();
        if (!db) {
            console.error("Error connecting to the database");
            return;
        }
        //run a query to delete a user game from the users_games table
        const result = await runQueryWithRetry(db, "DELETE FROM users_games WHERE user_id = $1 AND user_game_id = $2", [req.user_id, req.params.user_game_id]);
        //close the database connection
        closeDb(db);
        //send the result to the client
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(400).send("Error deleting user game");
    }
};

//updates a user games buyprice in the users_games table
const updateUserGame = async (req, res) => {
    try {
        //connect to the database in write mode
        const db = connectEditDb();
        if (!db) {
            console.error("Error connecting to the database");
            return;
        }
        //run a query to update a user games buyprice in the users_games table
        const result = await runQueryWithRetry(db, "UPDATE users_games SET buyprice = $1 WHERE user_id = $2 AND user_game_id = $3", [req.body.buyprice, req.user_id, req.params.user_game_id]);
        //close the database connection
        closeDb(db);
        //send the result to the client
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(400).send("Error updating user game");
    }
};

//deletes all the usergames of a specific user
const deleteUsersUserGames = async (req, res) => {
    try {
        //connect to the database in write mode
        const db = connectEditDb();
        if (!db) {
            console.error("Error connecting to the database");
            return;
        }
        //run a query to delete all the user games of a specific user
        const result = await runQueryWithRetry(db, "DELETE FROM users_games WHERE user_id = $1", [req.user_id]);
        //close the database connection
        closeDb(db);
        //send the result to the client
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(400).send("Error deleting user games");
    }
};

export { getUserGames, addUserGame, deleteUserGame, updateUserGame, deleteUsersUserGames };