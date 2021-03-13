const express = require('express');
const apiRouter = require('./routes/api');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// View engine setup 
app.set('view engine', 'ejs'); 

// Connect to DATABASE
mongoose.connect(process.env.DB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => console.log("Connected to DB"))
        .catch(err => console.log(err));

// MIDDLEWARES

app.use(express.urlencoded({
    extended: true 
}));
app.use(express.json());

// Routes

app.use("/api", apiRouter);
app.get("/", (req, res, next) => {
    res.render("index");
    next();
});

// Error handler
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render("error", { error: err });
    next();
});

// Start server
app.listen(process.env.PORT, () => {
    console.log("Listenning on port ", process.env.PORT);
});