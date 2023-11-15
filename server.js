const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const mongoose = require('mongoose');
const { MONGO_URI } = process.env;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`Error connecting to MongoDB: ${err.message}`);
});

const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));