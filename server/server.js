//Keep this at the top. sets environment
require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const path = require('path');
const graphqlHTTP = require('express-graphql');
const pgp = require('pg-promise')();
const { buildSchema } = require('graphql');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { typeDefs, resolver } = require('./graphql');
const { getUserFromUsername } = require('./graphql/dbQueryHelper');

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

/* BEGIN Authentication region */
// enable cors
var corsOptions = {
  origin: 'sheng-ji-3.herokuapp',
  credentials: true, // <-- REQUIRED backend setting
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

// JWT signing
const SECRET_KEY = 'secret!'; // REPLACE WITH env variable
const saltRounds = 10;

// Login function
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const theUser = await getUserFromUsername(username, db);

  if (!theUser) {
    res.status(404).send({
      success: false,
      message: `Could not find account: ${username}`,
    });
    return;
  }

  console.log(password);
  console.log(theUser.passwordHash);

  await bcrypt.compare(password, theUser.passwordHash, (err, success) => {
    if (!success) {
      //return error to user to let them know the password is incorrect
      res.status(401).send({
        success: false,
        message: 'Incorrect credentials',
      });
      return;
    }

    const token = jwt.sign(
      { username: theUser.username, id: theUser.userId },
      SECRET_KEY,
    );

    res.send({
      success: true,
      token: token,
    });
  });
});

app.post('/createUser', async (req, res) => {
  const { username, password } = req.body;
  const theUser = getUserFromUsername(username, db);

  if (theUser) {
    res.status(404).send({
      success: false,
      message: `Already a user with this username`,
    });
    return;
  }

  bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // Store hash in your password DB.
  });

  const token = jwt.sign(
    { username: theUser.username, id: theUser.userId },
    SECRET_KEY,
  );

  res.send({
    success: true,
    token: token,
  });
});

/* END Authentication region */

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  //Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
