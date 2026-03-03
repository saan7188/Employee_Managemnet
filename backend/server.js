// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Auto-create 'uploads' folder if it doesn't exist
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Make the uploads folder public so React can display the images
app.use("/uploads", express.static(uploadDir));

// Multer Configuration for Avatar Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Gives the image a unique name based on the current timestamp
    cb(null, `avatar-${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });

// Image Upload Endpoint
app.post("/upload", upload.single("avatar"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }
  // Return the URL so React can save it in the database
  const port = process.env.PORT || 5000;
  const fileUrl = `http://localhost:${port}/uploads/${req.file.filename}`;
  res.json({ avatarUrl: fileUrl });
});

// Import Employee Routes
const employeeRoutes = require("./routes/employees");
app.use("/employees", employeeRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Employee Management Backend Running 🚀");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});