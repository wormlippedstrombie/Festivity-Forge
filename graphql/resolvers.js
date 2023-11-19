import Event from '../models/event.js';

const resolvers = {
  Query: {
    events: async () => {
      try {
        const events = await Event.find();
        return events;
      } catch (error) {
        throw new Error(error);
      }
    },
    event: async (_, { id }) => {
      try {
        const event = await Event.findById(id);
        return event;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    createEvent: async (_, args) => {
      try {
        const newEvent = new Event({
          title: args.title,
          description: args.description,
          date: args.date,
          location: args.location,
          // You might set the organizer based on the authenticated user
          // organizer: authenticatedUser,
        });

        const result = await newEvent.save();
        return result;
      } catch (error) {
        throw new Error(error);
      }
    },
    updateEvent: async (_, args) => {
      try {
        const updatedEvent = await Event.findByIdAndUpdate(
          args.id,
          { $set: { title: args.title, description: args.description, date: args.date, location: args.location } },
          { new: true }
        );

        return updatedEvent;
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteEvent: async (_, { id }) => {
      try {
        const deletedEvent = await Event.findByIdAndRemove(id);
        return deletedEvent;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

export default resolvers;