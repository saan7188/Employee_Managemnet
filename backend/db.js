// db.js
const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Check connection and create the CORRECT table
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ MySQL Connected Successfully");

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS employees (
        id INT AUTO_INCREMENT PRIMARY KEY,
        employeeId VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(100) NOT NULL,
        department VARCHAR(100),
        designation VARCHAR(100),
        project VARCHAR(100),
        type VARCHAR(50),
        status VARCHAR(50) DEFAULT 'Permanent',
        avatar VARCHAR(255) DEFAULT ''
      )
    `;

    connection.query(createTableQuery, (err) => {
      if (err) {
        console.error("❌ Error creating table:", err.message);
      } else {
        console.log("✅ Employees table ready and synced with frontend");
      }
      connection.release();
    });
  }
});

module.exports = db;