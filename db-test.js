const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false, // Allow AWS self-signed cert
  }
});


pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ Connection failed:", err);
  } else {
    console.log("✅ Connected successfully at:", res.rows[0].now);
  }
  pool.end();
});
