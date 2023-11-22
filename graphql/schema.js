import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
  }

  type AuthData {
    _id: ID!
    username: String!
    authToken: String!
  }

  type Event {
    _id: ID
    title: String
    description: String
    date: String
    location: String
  }

  type Query {
    events: [Event]
    event(id: ID): Event
    findUserByUsername(username: String!): User
  }

  type Mutation {
    registerUser(
      username: String!, 
      password: String!
    ): User!
    loginUser(
      username: String!,
      password: String!
    ): AuthData!
    createEvent(
      title: String!
      description: String!
      date: String!
      location: String!
    ): Event
    updateEvent(
      id: ID!
      title: String
      description: String
      date: String
      location: String
    ): Event
    deleteEvent(id: ID!): Event
  }
`;

export default typeDefs;