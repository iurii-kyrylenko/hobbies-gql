const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

mongoose.Promise = global.Promise;

// GraphQL uses a special method valueOf to serialize ID in object type
// https://github.com/apollographql/apollo-server/issues/1633
//
ObjectId.prototype.valueOf = function () {
	return this.toString();
};

mongoose.connect(process.env.CONNECTION_STRING);

mongoose.connection
  .on('connected', () => console.log('mongo connected'))
  .on('error', () => console.log('mongo connection error'))
  .on('disconnected', () => console.log('mongo disconnectes'));

require('../models/User');
require('../models/Book');
require('../models/Movie');
