const express = require('express');
const urlsRouter = express.Router();
const Url = require("../models/Url");

urlsRouter.get("/", (req, res) => {
    res.send("What are you looking for?");
});

urlsRouter.post("/", (req, res, next) => {
    console.log(req.body);
    if (req.body.slug === '') {
        req.body.slug = undefined;
    }
    const url = new Url({
        url: req.body.url,
        slug: req.body.slug
    });
    console.log(url);
    url.save()
        .then((data) => res.json(data))
        .catch((err) => next(err));
});

module.exports = urlsRouter;