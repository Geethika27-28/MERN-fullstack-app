const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const postRoutes = require("./routes/postRoutes");

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

// API routes
app.use("/api/posts", postRoutes);

// Home route
app.get("/", (req, res) => {
    res.send("Blog API Server is Running");
});

// Database connection and server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        console.log("MongoDB Connected Successfully");

        app.listen(process.env.PORT, () => {
            console.log(
                `Server running on port ${process.env.PORT}`
            );
        });

    })
    .catch((error) => {
        console.log("Database Connection Failed:", error.message);
    });