//Keep this at the top. sets environment
require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const path = require('path');
var graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const { Client } = require('pg');

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

// Postgres setup
// Hard coded fallback (put in .env file if you want to check against real db
// and don't commit .env file)
const db = process.env.DATABASE_URL || 'postgres://localhost:5432/mylocaldb';

const client = new Client({
  connectionString: db,
  ssl: dev,
});

client.connect();

client.query(
  'SELECT table_schema,table_name FROM information_schema.tables;',
  (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      //console.log(JSON.stringify(row));
    }
    client.end();
  },
);
