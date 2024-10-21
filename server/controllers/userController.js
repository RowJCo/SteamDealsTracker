// userController.js - perform CRUD operations on the users table

//import dependencies
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  connectEditDb,
  connectReadDb,
  closeDb,
  runQueryWithRetry,
} from "../utils/db.js";

const createUser = async (req, res) => {
  try {
    //connect to the database
    const db = connectEditDb();
    // get email and password from the request body
    const { user } = req.body;
    const { email, password } = user;
    // check if the email is already in use
    const checkEmail = await runQueryWithRetry(
      db,
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (checkEmail.rows.length > 0) {
      closeDb(db);
      return res.status(400).json({ message: "User already exists" });
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // insert the user into the database
    const response = await runQueryWithRetry(
      db,
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING email",
      [email, hashedPassword]
    );
    closeDb(db);
    // return the user data
    return res
      .status(201)
      .json({ message: "User created", data: response.rows });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Unable to create user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    //connect to the database
    const db = connectEditDb();
    // get the user_id from the request object
    const { user_id } = req;
    // delete the user from the database
    const response = await runQueryWithRetry(
      db,
      "DELETE FROM users WHERE user_id = $1 RETURNING email",
      [user_id]
    );
    // delete the user's usergames from the database
    await runQueryWithRetry(db, "DELETE FROM users_games WHERE user_id = $1", [
      user_id,
    ]);
    closeDb(db);
    // return the user data
    return res
      .status(200)
      .clearCookie("steamAuthToken")
      .json({ message: "User deleted", data: response.rows });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Unable to delete user" });
  }
};

const authUser = async (req, res) => {
  try {
    //connect to the database
    const db = connectReadDb();
    // get email and password from the request body
    const { user } = req.body;
    const { email, password } = user;
    // check if the email is valid
    const isEmailValid = await runQueryWithRetry(
      db,
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (isEmailValid.rows.length === 0) {
      closeDb(db);
      return res.status(400).json({ message: "Invalid email" });
    }
    // check if the password is valid
    const isValidPassword = await bcrypt.compare(
      password,
      isEmailValid.rows[0].password
    );
    if (!isValidPassword) {
      closeDb(db);
      return res.status(400).json({ message: "Invalid password" });
    }
    closeDb(db);
    // create a token
    const token = jwt.sign(
      { id: isEmailValid.rows[0].id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    // return the token in a cookie
    return res
      .status(200)
      .cookie("steamAuthToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 3600000,
      })
      .json({ message: "User authenticated" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Unable to authenticate user" });
  }
};

const unAuthUser = async (req, res) => {
  try {
    // clear the cookie
    return res
      .status(200)
      .clearCookie("steamAuthToken")
      .json({ message: "User unauthenticated" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Unable to unauthenticate user" });
  }
};

const hasAuth = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ message: "User authenticated", isAuthenticated: true });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "User is not authenticated", isAuthenticated: false });
  }
};

export { createUser, deleteUser, authUser, unAuthUser, hasAuth };
