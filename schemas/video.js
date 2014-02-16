var mongoose = require('mongoose');

mongoose.exports = mongoose.model('Video', {
    id: Number,
    title: String,
    category: String,
    word: String
});