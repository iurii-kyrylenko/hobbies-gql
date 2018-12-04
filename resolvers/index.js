const { users } = require('./users');

const resolvers = {
  BookKind: {
    REGULAR: 'r',
    AUDIO: 'a',
    MIXED: 'r-a'
  },
  Query: {
    users,
    books: () => [],
    movies: () => [],
  }
};

module.exports = { resolvers };
