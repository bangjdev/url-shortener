const Url = require("../models/Url");

const saveUrl = (url, slug) => {
    return Url.create({
        url: url,
        slug: slug
    });
}

const findUrl = (slug) => {
    return Url.findOne({
        slug: slug
    });
}

module.exports = {
    saveUrl,
    findUrl
};