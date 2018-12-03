require('dotenv').config()
require('./config/db');

const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./typeDefs');
const { resolvers } = require('./resolvers');

const PORT = 4000;
const app = express();

const context = { mongoose };
const server = new ApolloServer({ typeDefs, resolvers, context });
server.applyMiddleware({ app });


app.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});
