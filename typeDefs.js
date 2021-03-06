const { gql } = require("apollo-server-express");

const typeDefs = gql`
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
    bookCount: Int
    movieCount: Int
    total: Int
    # books: [Book]
    # movies: [Movie]
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
    users(search: String = "", first: Int = 0, after: String = ""): UserConnection
    books(userId: ID!): [Book]!
    movies(userId: ID!): [Movie]!
  }
`;

module.exports = { typeDefs };