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
    const slugRegex = /^[a-zA-Z0-9_]+$/;
    return (slug.length > 0) && (slug.length < 255) && (slug.match(slugRegex) != null);
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
        validate: [isValidSlug, "Slug invalid format, must be less than 255 characters and only contains letters, numbers"],
        unique: [true, 'The slug ({VALUE}) has been taken']
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Url', UrlSchema);