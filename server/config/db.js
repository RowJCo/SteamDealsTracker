//Imports node modules
import sqlite from 'sqlite3';

//Sets up the database structure
const createDb = () => {
    //create the database or open it if it already exists
    const db = new sqlite.Database("./steamdealstracker.sqlite", sqlite.OPEN_CREATE | sqlite.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Connected to the database.");
    });
    //create the users table if it doesn't exist
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )`);
    });
    console.log("Created the users table.");
    //create the games table if it doesn't exist
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS games (
            game_id INTEGER PRIMARY KEY,
            game_name TEXT UNIQUE NOT NULL,
            price INTEGER NULL
        )`);
    });
    console.log("Created the games table.");
    //create the users_games table if it doesn't exist
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS users_games (
            user_game_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            game_id INTEGER,
            game_name TEXT,
            buyprice INTEGER NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(user_id),
            FOREIGN KEY(game_id) REFERENCES games(game_id),
            FOREIGN KEY(game_name) REFERENCES games(game_name)
        )`);
    });
    console.log("Created the users_games table.");
    //close the database connection
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Closed the database connection.");
    });
}

// Function to connect to the database in read-write mode
const connectEditDb = () => {
    const db = new sqlite.Database('./steamdealstracker.sqlite', sqlite.OPEN_READWRITE, (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
        } else {
            console.log('Connected to the database.');
        }
    });
    // Set a busy timeout of 5 seconds
    db.configure('busyTimeout', 5000);
    return db;
};

// Function to connect to the database in read-only mode
const connectReadDb = () => {
    const db = new sqlite.Database('./steamdealstracker.sqlite', sqlite.OPEN_READONLY, (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
        } else {
            console.log('Connected to the database.');
        }
    });
    // Set a busy timeout of 5 seconds
    db.configure('busyTimeout', 5000);
    return db;
};

// Function to close the database connection
const closeDb = (db) => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('Closed the database connection.');
        }
    });
};

// Function to run a query with retry logic
const runQueryWithRetry = (db, query, params, retries = 5) => {
    return new Promise((resolve, reject) => {
        const attempt = (retryCount) => {
            db.run(query, params, (err) => {
                if (err) {
                    if (err.code === 'SQLITE_BUSY' && retryCount > 0) {
                        console.warn(`Database is busy, retrying... (${retries - retryCount + 1}/${retries})`);
                        setTimeout(() => attempt(retryCount - 1), 1000); // Retry after 1 second
                    } else {
                        reject(err);
                    }
                } else {
                    resolve();
                }
            });
        };
        attempt(retries);
    });
};

export { createDb, connectEditDb, connectReadDb, closeDb, runQueryWithRetry };