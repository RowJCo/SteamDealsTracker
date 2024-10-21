// db.js - Connection to the database , query function and database setup

//import dependencies
import sqlite from "sqlite3";

const createDb = () => {
  //create the database or open it if it already exists
  const db = new sqlite.Database(
    "./steamdealstracker.sqlite",
    sqlite.OPEN_CREATE | sqlite.OPEN_READWRITE,
    (error) => {
      if (error) {
        console.error(error.message);
      }
      console.log("Connected to the database.");
    }
  );
  //create the users table if it doesn't exist
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )`);
  });
  console.log("Created the users table.");
  //create the games table if it doesn't exist
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS games (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            price_final INTEGER NULL,
            price_formatted TEXT NULL
        )`);
  });
  console.log("Created the games table.");
  //create the users_games table if it doesn't exist
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users_games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            game_id INTEGER,
            game_name TEXT,
            buy_price INTEGER NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(game_id) REFERENCES games(id),
            FOREIGN KEY(game_name) REFERENCES games(name)
        )`);
  });
  console.log("Created the users_games table.");
  //close the database connection
  db.close((error) => {
    if (error) {
      console.error(error.message);
    }
    console.log("Closed the database connection.");
  });
};

const connectEditDb = () => {
  //connects to the database in read-write mode
  const db = new sqlite.Database(
    "./steamdealstracker.sqlite",
    sqlite.OPEN_READWRITE,
    (error) => {
      if (error) {
        console.error("Error opening database:", error.message);
      } else {
        console.log("Connected to the database.");
      }
    }
  );
  return db;
};

const connectReadDb = () => {
  //connects to the database in read-only mode
  const db = new sqlite.Database(
    "./steamdealstracker.sqlite",
    sqlite.OPEN_READONLY,
    (error) => {
      if (error) {
        console.error("Error opening database:", error.message);
      } else {
        console.log("Connected to the database.");
      }
    }
  );
  return db;
};

//closes the database connection
const closeDb = (db) => {
  db.close((error) => {
    if (error) {
      console.error("Error closing database:", error.message);
    } else {
      console.log("Closed the database connection.");
    }
  });
};

//runs a query on the database with retry logic in case of failure and returns the result
const runQueryWithRetry = (db, query, params = []) => {
  return new Promise((resolve, reject) => {
    let retries = 0;
    const maxRetries = 5;
    const retryInterval = 1000;
    const runQuery = () => {
      db.all(query, params, (error, rows) => {
        if (error) {
          console.log("Error running query:", error.message);
          if (retries < maxRetries) {
            retries++;
            console.log(`Retrying in ${retryInterval}ms...`);
            setTimeout(runQuery, retryInterval);
          } else {
            reject(error);
          }
        } else {
          resolve({ rows });
        }
      });
    };
    runQuery();
  });
};

export { createDb, connectEditDb, connectReadDb, closeDb, runQueryWithRetry };
