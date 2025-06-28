const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }
});

const sql = `
CREATE TABLE IF NOT EXISTS sales_data (
    id SERIAL PRIMARY KEY,
    product VARCHAR(100),
    region VARCHAR(100),
    salesperson VARCHAR(100),
    amount DECIMAL,
    date DATE
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password_hash TEXT,
    role VARCHAR(20)
);
`;

pool.query(sql)
  .then(() => {
    console.log("✅ Tables created successfully");
    pool.end();
  })
  .catch(err => {
    console.error("❌ Error creating tables:", err);
    pool.end();
  });
