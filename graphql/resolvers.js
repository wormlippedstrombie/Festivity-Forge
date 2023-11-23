import Event from '../models/event.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.js';


dotenv.config();

// Function to hash the user's password
const hashPassword = (password) => {
  const trimmedPassword = password.trim();
  const saltRounds = 9;
  return bcryptjs.hashSync(trimmedPassword, saltRounds);
};

// Function to generate an authentication token
const generateAuthToken = (user) => {
  const secretKey = process.env.JWT_SECRET || 'defaultSecretKey';
  return jwt.sign({ userId: user._id, username: user.username }, secretKey, { expiresIn: '1h' });

};

const resolvers = {
  Query: {
    findUserByUsername: async (_, { username }) => {
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
      try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error('Username is already taken');
        }

        // Hash the password
        const hashedPassword = hashPassword(password, 10);

        // Create a new user in the database
        const newUser = new User({
          username,
          password: hashedPassword,
        });

        await newUser.save();

        return newUser; // Return the newly registered user
      } catch (error) {
        console.error('Error registering user:', error);
        throw new Error('Unable to register user');
      }
    },

    loginUser: async (_, { username, password }) => {
      try {
        // Find the user by username
        const user = await User.findOne({ username });
    
        if (!user) {
          throw new Error('User not found');
        }
        const trimmedPassword = password.trim();

        // Verify the password
        console.log('Entered Password:', password);
        console.log('Stored Hashed Password:', user.password);
        const isPasswordValid = bcryptjs.compareSync(trimmedPassword, user.password);
        console.log('Password Validation Result:', isPasswordValid);
        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }
    
        // Ensure the user has a valid _id
        if (!user._id) {
          throw new Error('User ID is missing or invalid');
        }
    
        // Generate a token or session for authentication
        const authToken = generateAuthToken(user);
    
        // Return the required user data
        console.log('Login Successful. User:', user);
        return {
          _id: user._id,
          username: user.username,
          // Include other fields if needed
          authToken,
        };
      } catch (error) {
        console.error('Error logging in:', error);
        throw new Error('Unable to log in');
      }
    },

    createEvent: async (_, args, { user }) => {
      try {
          const newEvent = new Event({
          title: args.title,
          description: args.description,
          date: args.date,
          location: args.location,
        });
    
        const result = await newEvent.save();
        return result;
      } catch (error) {
        console.error('Error creating event:', error);
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