const mongoose = require('mongoose');
const nanoid = require('nanoid')

const genRandomSlug = () => {
    const len = process.env.DEFAULT_SLUG_LENGTH;
    return nanoid.nanoid(len);
}

const isUrl = (url) => {
    return url.length > 2;
}

const UrlSchema = mongoose.Schema({
    url: {
        type: String,
        required: [true, "Missing URL field"],
        validate: [isUrl, "URL invalid"]
    },
    slug: {
        type: String,
        required: false,
        default: genRandomSlug,
        unique: [true, "That slug has already been taken"]
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Url', UrlSchema);