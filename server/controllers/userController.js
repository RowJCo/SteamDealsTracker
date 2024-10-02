//Import node modules
import bcrypt from 'bcrypt';

//Import custom modules
import { connectEditDb, connectReadDb, closeDb, runQueryWithRetry } from '../config/db.js';

//create a new user
const signUp = async (req, res) => {
    try {
        //connect to the database in write mode
        const db = connectEditDb();
        if (!db) {
            return res.status(400).send("Error connecting to the database");
        }
        //check if the email is already in use by checking if the email exists in the users table and return a true or false value
        const emailExists = await runQueryWithRetry(db, "SELECT * FROM users WHERE email = ?", [req.body.email]);
        if (emailExists) {
            closeDb(db);
            return res.status(400).send("Email already in use");
        }
        //hash the user's password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        //run a query to add a new user to the users table
        const result = await runQueryWithRetry(db, "INSERT INTO users (email, password) VALUES ($1, $2)", [req.body.email, hashedPassword]);
        //close the database connection
        closeDb(db);
        //send the result to the client
        res.status(200).send("User created");
    } catch (error) {
        console.error(error);
        res.status(400).send("Error creating user");
    }
};

//sign in a user
const signIn = async (req, res) => {
    try {
        //connect to the database in read mode
        const db = connectReadDb();
        if (!db) {
            return console.error("Error connecting to the database");
        }
        //run a query to get the user's password
        const result = await runQueryWithRetry(db, "SELECT * FROM users WHERE email = $1", [req.body.email]);
        //close the database connection
        closeDb(db);
        //check if the user exists
        if (result.length === 0) {
            return res.status(400).send("User not found");
        }
        //check if the password is correct
        if (!await bcrypt.compare(req.body.password, result[0].password)) {
            return res.status(400).send("Incorrect password");
        }
        //add user_id to the session
        req.session.userId = result[0].user_id;
        //send a success message to the client
        res.status(200).send("User signed in");
    } catch (error) {
        console.error(error);
        res.status(400).send("Error signing in user", error);
    }
};

//sign out a user
const signOut = (req, res) => {
    //clear the token cookie
    res.clearCookie("Authorization");
    //send a success message to the client
    res.status(200).send("User signed out");
};

//delete a user
const deleteUser = async (req, res) => {
    try {
        //connect to the database in write mode
        const db = connectEditDb();
        if (!db) {
            return console.error("Error connecting to the database");
        }
        //run a query to delete the user from the users table
        const result = await runQueryWithRetry(db, "DELETE FROM users WHERE user_id = $1", [req.session.userId]);
        //close the database connection
        closeDb(db);
        //send the result to the client
        res.status(200).send("User deleted");
    } catch (error) {
        console.error(error);
        res.status(400).send("Error deleting user");
    }
};

//check if a user is signed in
const checkAuth = async (req, res) => {
    try {
        return res.status(200).json({ message: 'User is authenticated' });
    } catch (error) {
        return res.status(400).json({ error: 'User is not authenticated' });
    }
};

export default { signUp, signIn, signOut, deleteUser, checkAuth };
