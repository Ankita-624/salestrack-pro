const AWS = require("aws-sdk");
const fs = require("fs");
const csv = require("csv-parser");
const { Pool } = require("pg");

require("dotenv").config();

// DB connection
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false }
});

// AWS S3 config
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

exports.uploadCSVToS3 = (filePath, fileName) => {
  const fileContent = fs.readFileSync(filePath);
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: `uploads/${Date.now()}-${fileName}`,
    Body: fileContent,
  };

  return s3.upload(params).promise(); // returns a Promise
};

exports.insertSalesData = async (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          for (let row of results) {
            await pool.query(
              `INSERT INTO sales_data(product, region, salesperson, amount, date)
               VALUES ($1, $2, $3, $4, $5)`,
              [row.product, row.region, row.salesperson, row.amount, row.date]
            );
          }
          resolve();
        } catch (err) {
          reject(err);
        }
      });
  });
};
