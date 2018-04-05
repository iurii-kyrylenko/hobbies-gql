const users = (root, args, ctx) => {
  const User = ctx.mongoose.model('User');

  const aggregator = User.aggregate()
    .lookup({ from: "books", localField: "_id", foreignField: "userId", as: "books" })
    .lookup({ from: "movies", localField: "_id", foreignField: "userId", as: "movies" })
    .project({
      _id: 0,
      id: '$_id',
      name: 1,
      email: 1,
      shareBooks: 1,
      shareMovies: 1,
      books: { $size: "$books" },
      movies: { $size: "$movies" },
      total: { $add: [{ $size: '$books' }, { $size: '$movies' }] },
    })
    .sort({ total: -1, name: 1 });

    return aggregator;
};

const resolvers = {
  Query: {
    users,
    books: () => [],
    movies: () => [],
  }
};

module.exports = { resolvers };
