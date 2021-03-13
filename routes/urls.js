const express = require('express');
const urlsRouter = express.Router();

urlsRouter.get("/", (req, res) => {
    res.send("What are you looking for?");
});

urlsRouter.post("/", (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

module.exports = urlsRouter;