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
    total: Int
  }

  type UserConnection {
    edges: [UserEdge]
    pageInfo: PageInfo!
  }

  type UserEdge {
    cursor: String!
    node: User!
  }

  type PageInfo {
    hasNextPage: Boolean!
  }

  type Query {
    test1: [User]
    test2: [User]
    users(search: String = "", first: Int = 0, after: String = ""): UserConnection
    users2(search: String = "", last: Int = 0, before: String = ""): UserConnection
    books(userId: ID!): [Book]!
    movies(userId: ID!): [Movie]!
  }
`;

module.exports = { typeDefs };