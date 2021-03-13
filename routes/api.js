const express = require('express');
const apiRouter = express.Router();
const urlsRouter = require('./urls');

apiRouter.get("/", (req, res) => {
    res.send("This is my api endpoint");
});

apiRouter.use("/urls", urlsRouter);

module.exports = apiRouter;