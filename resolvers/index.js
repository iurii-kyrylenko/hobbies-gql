const { users } = require('./users');

const resolvers = {
  Query: {
    users,
    books: () => [],
    movies: () => [],
  }
};

module.exports = { resolvers };
