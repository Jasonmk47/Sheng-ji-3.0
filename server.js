const express = require('express');
const path = require('path');
var graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

// GraphQL schema
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);
// Root resolver
var root = {
  hello: () => {
    return 'Hello World';
  },
};

const app = express();
const port = process.env.PORT || 5000;
const dev = process.env.NODE_ENV === 'development';

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: dev,
  }),
);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  //Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
