const sortObjectToCursor = ({ name, total }) => {
  const stringFromObject = JSON.stringify({ name, total });
  return Buffer.from(stringFromObject).toString('base64');
};

const cursorToSortObject = cursor => {
  if (!cursor || cursor === '') return null;
  const stringFromBase64 = Buffer.from(cursor, 'base64').toString();
  return JSON.parse(stringFromBase64);
};

const users = async (root, { search, first, after }, ctx) => {
  const User = ctx.mongoose.model('User');

  const aggregator = User.aggregate()
    .match({ name: new RegExp(search, 'i') })
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

  const sortObject = cursorToSortObject(after);

  if (sortObject) {
    const { name, total } = sortObject;
    aggregator.match({
      $or: [
        { total: { $lt: total } },
        { $and: [{ total: { $eq: total } }, { name: { $gt: name } }] }
      ]
    });
  }

  if (first) {
    aggregator.limit(first + 1);
  }

  let users = await aggregator;
  let hasNextPage = false;

  if (first && users.length === first + 1) {
    users = users.slice(0, first);
    hasNextPage = true;
  }

  return {
    edges: users.map(node => ({
      node,
      cursor: sortObjectToCursor(node)
    })),
    pageInfo: {
      hasNextPage
    }
  };
};

module.exports = { users };
