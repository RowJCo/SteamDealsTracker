import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
    host: "localhost",
    database: "postgres",
    user: "postgres",
    password: "password",
    port: 5432,
});

export default pool;
