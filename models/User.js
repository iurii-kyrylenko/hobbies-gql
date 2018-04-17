const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    hash: String,
    salt: String,
    shareBooks: Boolean,
    shareMovies: Boolean
});

mongoose.model('User', userSchema);
