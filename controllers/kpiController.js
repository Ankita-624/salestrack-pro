const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
});

// 🔝 Top 3 sales reps by total sales
exports.getTopSalesReps = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT salesperson, SUM(amount) AS total_sales
      FROM sales_data
      GROUP BY salesperson
      ORDER BY total_sales DESC
      LIMIT 3
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch top sales reps" });
  }
};

// 📅 Monthly revenue summary
exports.getMonthlyRevenue = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT TO_CHAR(date, 'YYYY-MM') AS month, SUM(amount) AS total
      FROM sales_data
      GROUP BY month
      ORDER BY month
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch monthly revenue" });
  }
};

// 🌍 Region-wise total sales
exports.getRegionSummary = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT region, SUM(amount) AS total
      FROM sales_data
      GROUP BY region
      ORDER BY region
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch regional sales" });
  }
};
