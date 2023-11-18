const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');

// Import UserType if you have it
const UserType = require('./path/to/UserType');

const resolvers = require('./resolvers');

const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    date: { type: GraphQLString },
    location: { type: GraphQLString },
    organizer: {
      type: UserType, // Assuming you have a UserType
      resolve(parent, args) {
        // Implement resolver logic to get the organizer details if needed
      },
    },
    // Add other fields as needed
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    events: {
      type: new GraphQLList(EventType),
      resolve(parent, args) {
        // Implement resolver logic to get all events
      },
    },
    event: {
      type: EventType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Implement resolver logic to get a specific event by ID
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createEvent: {
      type: EventType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLString) },
        location: { type: new GraphQLNonNull(GraphQLString) },
        // Add other required fields here
      },
      resolve(parent, args) {
        // Implement resolver logic to create a new event
      },
    },
    updateEvent: {
      type: EventType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        date: { type: GraphQLString },
        location: { type: GraphQLString },
        // Add other fields you want to update
      },
      resolve(parent, args) {
        // Implement resolver logic to update an existing event
      },
    },
    deleteEvent: {
      type: EventType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        // Implement resolver logic to delete an event
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});