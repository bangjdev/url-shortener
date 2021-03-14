const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');

try {
    require('dotenv').config();
} catch (err) {
    console.error(err);
}

const apiRouter = require('./routes/api');

const app = express();

// View engine setup 
app.set('view engine', 'ejs'); 

// MIDDLEWARES
app.use(helmet({
        contentSecurityPolicy: false,
    })
);
app.use(morgan('tiny'));
app.use(express.urlencoded({
    extended: true 
}));
app.use(express.json());
app.use('/public', express.static('public'));

// Routes
app.use("/api", apiRouter);

app.get("/", (req, res, next) => {
    res.render("index");
});

app.get("/:slug", (req, res, next) => {
    const { slug } = req.params;
    res.redirect("/api/urls/" + slug);
});

app.get("*", (req, res, next) => {
    res.status(404).render("error", {error: "We can't give you what you're looking for"});
});

// Error handler
app.use(function (err, req, res, next) {
    console.error(err);
    let message = "Something happens ! 😓";
    let status = 500;
    switch (err.code) {
        case 11000:
            message = "That slug has already been taken 😰";
            status = 400;
            break;
    }
    res.status(status);
    res.render("error", { error: message });
});

// Start server
app.listen(process.env.PORT, () => {
    console.log("Listenning on port ", process.env.PORT);
});

// Connect to DATABASE
mongoose.connect(process.env.DB_URI, {
    useUnifiedTopology: true, 
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => console.log("Connected to DB")).catch(err => console.log(err));