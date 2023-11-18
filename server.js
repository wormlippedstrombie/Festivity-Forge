import express from 'express';
const app = express();
import mongoose from 'mongoose';
import { graphqlHTTP } from 'express-graphql'; // Import graphqlHTTP directly
const PORT = process.env.PORT || 3001;

import dotenv from 'dotenv'; // Import dotenv directly
dotenv.config(); // Load environment variables from .env file

// MongoDB connection
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

// GraphQL setup
import schema from './graphql/schema'; // Assuming schema is an ESM module
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

// Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});