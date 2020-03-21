//Keep this at the top. sets environment
require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const path = require('path');
const graphqlHTTP = require('express-graphql');
const pgp = require('pg-promise')();
const { buildSchema } = require('graphql');
const cors = require('cors');

const { typeDefs, resolver } = require('./graphql');

// Express
const app = express();
const port = process.env.PORT || 5000;
const dev = process.env.NODE_ENV === 'development';

// Postgres setup
// Hard coded fallback (put in .env file if you want to check against real db
// and don't commit .env file)
const connection_string =
  process.env.DATABASE_URL || 'postgres://localhost:5432/mylocaldb';

const db = pgp(connection_string);

// GraphQL
app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(typeDefs),
    rootValue: resolver,
    graphiql: dev,
    context: db,
  }),
);

// enable cors
var corsOptions = {
  origin: 'sheng-ji-3.herokuapp',
  credentials: true, // <-- REQUIRED backend setting
};
app.use(cors(corsOptions));

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  //Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
