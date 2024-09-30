//Import node modules
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//Import custom modules
import { connectEditDb, connectReadDb, closeDb, runQueryWithRetry } from '../config/db';

//create a new user
const signUp = async (req, res) => {
    try {
        //connect to the database in write mode
        const db = connectEditDb();
        if (!db) {
            console.error("Error connecting to the database");
            return;
        }
        //hash the user's password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        //run a query to add a new user to the users table
        const result = await runQueryWithRetry(db, "INSERT INTO users (email, password) VALUES ($1, $2)", [req.body.email, hashedPassword]);
        //close the database connection
        closeDb(db);
        //send the result to the client
        res.status(200).send(result);
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
            console.error("Error connecting to the database");
            return;
        }
        //run a query to get the user's password
        const result = await runQueryWithRetry(db, "SELECT * FROM users WHERE email = $1", [req.body.email]);
        //close the database connection
        closeDb(db);
        //check if the user exists
        if (result.length === 0) {
            res.status(400).send("User not found");
            return;
        }
        //check if the password is correct
        if (!await bcrypt.compare(req.body.password, result[0].password)) {
            res.status(400).send("Incorrect password");
            return;
        }
        //create a JWT token
        const token = jwt.sign({ user_id: result.user_id }, process.env.JWT_SECRET);
        //set the token as a cookie
        res.cookie("Authorization", token, { 
            httpOnly: true,
            path: "/",
            secure: true,
            sameSite: "Strict",
            maxAge: 3600000
         });
        //send a success message to the client
        res.status(200).send("User signed in");
    } catch (error) {
        console.error(error);
        res.status(400).send("Error signing in user");
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
            console.error("Error connecting to the database");
            return;
        }
        //run a query to delete the user from the users table
        const result = await runQueryWithRetry(db, "DELETE FROM users WHERE user_id = $1", [req.user_id]);
        //close the database connection
        closeDb(db);
        //send the result to the client
        res.status(200).send("User deleted");
    } catch (error) {
        console.error(error);
        res.status(400).send("Error deleting user");
    }
};

export { signUp, signIn, signOut, deleteUser };
