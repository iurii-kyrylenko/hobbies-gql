require('dotenv').config()
require('./config/db');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs } = require('./typeDefs');
const { resolvers } = require('./resolvers');

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const context = {
  mongoose
};

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, context }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});
