import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import typeDefs from './graphql/schema.js'; 
import resolvers from './graphql/resolvers.js'; 

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Make sure to await server.start() before applying middleware
async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
}
app.use(cors());

startApolloServer().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
  });
});