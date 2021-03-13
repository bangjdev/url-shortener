const mongoose = require('mongoose');

const UrlSchema = mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: false
    },
    destination: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Urls', UrlSchema);