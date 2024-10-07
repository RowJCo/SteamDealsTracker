import sqlite from "sqlite3";

//connects to the database in read-write mode
export const connectEditDb = async function () {
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
  // Set a busy timeout of 5 seconds
  db.configure("busyTimeout", 5000);
  return db;
};

//connects to the database in read-only mode
export const connectReadDb = async function () {
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
  // Set a busy timeout of 5 seconds
  db.configure("busyTimeout", 5000);
  return db;
};

//closes the database connection
export const closeDb = async function (db) {
  db.close((error) => {
    if (error) {
      console.error("Error closing database:", error.message);
    } else {
      console.log("Closed the database connection.");
    }
  });
};

//runs a query with retry logic
export const runQueryWithRetry = async function (
  db,
  query,
  params,
  retries = 5
) {
  return new Promise((resolve, reject) => {
    const attempt = (retryCount) => {
      db.run(query, params, (error) => {
        if (error) {
          if (error.code === "SQLITE_BUSY" && retryCount > 0) {
            console.warn(
              `Database is busy, retrying... (${
                retries - retryCount + 1
              }/${retries})`
            );
            setTimeout(() => attempt(retryCount - 1), 1000); // Retry after 1 second
          } else {
            reject(error);
          }
        } else {
          resolve();
        }
      });
    };
    attempt(retries);
  });
};
