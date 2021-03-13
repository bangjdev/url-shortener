const express = require('express');
const apiRouter = require('./routes/api');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Connect to DATABASE
mongoose.connect(process.env.DB_URI, () => {
    console.log("Connected to DB");
});

// MIDDLEWARES

app.use(express.urlencoded());

app.use(express.json());

// Routes

app.use("/api", apiRouter);
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "static", "index.html"));
});

// Start server
app.listen(process.env.PORT, () => {
    console.log("Listenning on port ", process.env.PORT);
});