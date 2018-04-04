const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.CONNECTION_STRING);

mongoose.connection
    .on('connected', () => console.log('mongo connected'))
    .on('error', () => console.log('mongo connection error'))
    .on('disconnected', () => console.log('mongo disconnectes'));

require('./user');
require('./book');
require('./movie');