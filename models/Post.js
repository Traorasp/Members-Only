const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, required: true},
    message: {type: String, required: true},
    date: {type: Date, default: Date.now()},
});

module.exports = mongoose.model('Post', postSchema);