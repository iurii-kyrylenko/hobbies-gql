const users = (root, args, ctx) => {
  const User = ctx.mongoose.model('User');
  return User.find();
};

const books = (user, args, ctx) => {
  const Book = ctx.mongoose.model('Book');
  return Book.count({ userId: user.id });
};

const movies = (user, args, ctx) => {
  const Movie = ctx.mongoose.model('Movie');
  return Movie.count({ userId: user.id });
};

const resolvers = {
  Query: {
    users,
    books: () => [],
    movies: () => [],
  },
  User: {
    books,
    movies
  }
};

module.exports = { resolvers };