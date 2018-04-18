const { users } = require('./users');
const { users2 } = require('./users2');
const { test1, test2 } = require('./test');

const resolvers = {
  Query: {
    test1,
    test2,
    users,
    users2,
    books: () => [],
    movies: () => [],
  }
};

module.exports = { resolvers };
