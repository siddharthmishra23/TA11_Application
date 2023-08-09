require("dotenv").config();
const mysql = require("mysql2/promise");
const dbConfig = require("../config/dbConfig");
const express = require("express");
const router = express.Router();
const fs = require("fs");
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
//   ssl: { ca: fs.readFileSync(process.env.CA_CERT_PATH) },
// });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

router.get("/", async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM Electricity");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
