const express = require('express');
const urlsRouter = express.Router();
const urlFactory = require("../factories/UrlFactory");

urlsRouter.get("/", (req, res) => {
    res.send("What are you looking for?");
});

urlsRouter.get("/:slug", (req, res, next) => {
    const { slug } = req.params;
    urlFactory.findUrl(slug).then(url => {
        if (url) {
            console.log("Redirect to", url.url);
            res.redirect(url.url);
        } else {
            next();
        }
    }).catch(next);
});

urlsRouter.post("/", (req, res, next) => {
    let {url, slug} = req.body;
    if (slug === '') {
        slug = undefined;
    } else {
        slug = slug.trim();
    }

    url = url.trim();

    urlFactory.saveUrl(url, slug).then((savedUrl) => {
        res.render("success", {data: savedUrl});
    }).catch(next);
});

module.exports = urlsRouter;