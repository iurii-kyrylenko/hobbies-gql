const typeDefs = `
  scalar Date

  enum BookKind {
    REGULAR
    AUDIO
    MIXED
  }

  type Book {
    id: ID!
    userId: ID!
    title: String!
    author: String!
    mode: BookKind!
    completed: Date!
  }

  type Movie {
    id: ID!
    userId: ID!
    title: String!
    year: String!
    notes: String
    imdbId: String
    completed: Date!
  }

  type User {
    id: ID!
    name: String!
    email: String
    shareBooks: Boolean
    shareMovies: Boolean
    books: Int
    movies: Int
  }

  type Query {
    users: [User]!
    books(userId: ID!): [Book]!
    movies(userId: ID!): [Movie]!
  }
`;

module.exports = { typeDefs };