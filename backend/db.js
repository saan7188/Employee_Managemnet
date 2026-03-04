const mysql = require("mysql2/promise");
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

async function initializeDatabase() {
  try {
    const connection = await db.getConnection();
    console.log("✅ MySQL Connected Successfully (Promise Pool)");
    
    await connection.query(`
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
    `);
    
    connection.release();
  } catch (err) {
    console.error("❌ Database initialization failed:", err.message);
  }
}

initializeDatabase();

module.exports = db;