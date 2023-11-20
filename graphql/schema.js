import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    # Add other fields as needed
  }

  type Event {
    _id: ID
    title: String
    description: String
    date: String
    location: String
    organizer: User
    # Add other fields as needed
  }

  type Query {
    events: [Event]
    event(id: ID): Event
  }

  type Mutation {
    createEvent(
      title: String!
      description: String!
      date: String!
      location: String!
      organizerId: ID
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