import Event from '../models/event.js';

const resolvers = {
  Query: {
    findUserByUsername: async (_, { username }, { User }) => {
      try {
        const user = await User.findOne({ username });
        return user;
      } catch (error) {
        console.error('Error finding user by username:', error);
        throw new Error('Unable to find user by username');
      }
    },
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
    registerUser: async (_, { username, password }) => {
      // Check if the username already exists
      const existingUser = await findUserByUsername(username);
      if (existingUser) {
        throw new Error('Username is already taken');
      }

      // Hash the password (use a secure hashing library)
      const hashedPassword = hashPassword(password);

      // Create a new user in the database
      const newUser = await createUser({
        username,
        password: hashedPassword,
      });

      return newUser; // Return the newly registered user
    },

    loginUser: async (_, { username, password }) => {
      // Find the user by username
      const user = await findUserByUsername(username);
      if (!user) {
        throw new Error('User not found');
      }

      // Verify the password (use a secure password verification library)
      const isPasswordValid = verifyPassword(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      // Generate a token or session for authentication (use a secure authentication library)
      const authToken = generateAuthToken(user);

      return { authToken, user }; // Return the authentication token and user information
    },
    
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