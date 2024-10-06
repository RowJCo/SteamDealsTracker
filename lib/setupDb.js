import sqlite from "sqlite3";

//create the database or open it if it already exists
console.log("Setting up the database.");
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
//create the tables if they don't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )`);
  console.log("Created the users table.");

  db.run(`CREATE TABLE IF NOT EXISTS games (
            game_id INTEGER PRIMARY KEY,
            game_name TEXT UNIQUE NOT NULL,
            price INTEGER NULL
        )`);
  console.log("Created the games table.");

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
  console.log("Created the users_games table.");
});
//close the database connection
db.close((error) => {
  if (error) {
    console.error(error.message);
  }
  console.log("Closed the database connection.");
});
