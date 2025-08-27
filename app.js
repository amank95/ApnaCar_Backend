
// Load environment variables from .env file
const dotenv = require("dotenv");
dotenv.config();

// Import express framework
const express = require("express");

// Create an Express application
const app = express();

// Import cors to allow cross-origin requests (frontend compatibility)
const cors = require("cors")

// Import the MongoDB connection function
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');

// Enable CORS for all routes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connectToDb();

// Define a simple route for testing
app.get("/", (req, res) => {
    res.send("hello world")
});

app.use('/users', userRoutes);

// Export the Express app for use in other files (like server.js)
module.exports = app;