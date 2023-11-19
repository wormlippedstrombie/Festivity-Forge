import express from 'express';
const app = express();
import mongoose from 'mongoose';
import { graphqlHTTP } from 'express-graphql'; // Import graphqlHTTP directly
const PORT = process.env.PORT || 3001;
import schema from './graphql/schema.js';

import dotenv from 'dotenv'; // Import dotenv directly
dotenv.config(); // Load environment variables from .env file

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/myapp');

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`Error connecting to MongoDB: ${err.message}`);
});

// GraphQL setup
app.use('/graphql', graphqlHTTP({ 
  schema: schema,
  graphiql: true }));

// Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});