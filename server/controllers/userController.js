import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *";
        const values = [email, hashedPassword];
        await pool.query(query, values);
        res.status(201).json({ message: "User created" });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const query = "SELECT * FROM users WHERE email = $1";
        const values = [email];
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const user = result.rows[0];
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const expiration = 21600000;
        const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: expiration });
        res.cookie('Authorization', token, { 
            httpOnly: true,
            path: '/',
            secure: true,
            sameSite: 'Strict',
            maxAge: expiration,
        });
        res.status(200).json({ message: 'Signed in' });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};

const signOut = async (req, res) => {
    try {
        res.clearCookie('Authorization');
        res.status(200).json({ message: 'Signed out' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const checkAuth = async (req, res) => {
    try {
        res.status(200).json({ message: 'User is authenticated' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'User is not authenticated' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { user_id } = req;
        const query = "DELETE FROM users WHERE user_id = $1";
        const values = [user_id];
        await pool.query(query, values);
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};

export default { signUp, signIn, signOut, checkAuth, deleteUser };
