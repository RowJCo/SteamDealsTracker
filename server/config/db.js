//Imports dependencies
import dotenv from "dotenv";
import pkg from "pg";

//Configures the environment variables
dotenv.config()

//Extracts the Pool object from the pg package
const { Pool } = pkg;

//Creates a new Pool object with the database configuration
const pool = new Pool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

export default pool;
