require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to Database
connectDB();

// Test Route
app.get("/", (req, res) => {
    res.json({ message: "✅ Math Platform Server is Running!" });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: "❌ Route not found" });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error("❌ Error:", err.message);
    res.status(500).json({ error: "Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});