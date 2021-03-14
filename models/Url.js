const mongoose = require('mongoose');
const nanoid = require('nanoid');

const genRandomSlug = () => {
    const len = process.env.DEFAULT_SLUG_LENGTH;
    return nanoid.nanoid(len);
}

const isValidURL = (url) => {
    try {
        new URL(url);
    } catch (err) {
        return false;
    }
    return true;
}

const isValidSlug = (slug) => {
    return (slug.length > 0) && (slug.length < 255) && (/[a-zA-Z0-9_]/.test(slug));
}

const UrlSchema = mongoose.Schema({
    url: {
        type: String,
        required: [true, "Missing URL field"],
        validate: [isValidURL, "Invalid URL, don't mess with me 😡"]
    },
    slug: {
        type: String,
        required: false,
        default: genRandomSlug,
        unique: [true, 'The slug ({VALUE}) has been taken'],
        validate: [isValidSlug, "Slug invalid format, must be less than 255 characters and only contains letters, numbers"]
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Url', UrlSchema);