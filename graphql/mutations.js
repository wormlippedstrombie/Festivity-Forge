import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $password: String!) {
    registerUser(username: $username, password: $password) {
      _id
      username
    }
  }
`;
export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      _id
      username
    }
  }
`;
export const CREATE_EVENT = gql`
  mutation CreateEvent($title: String!, $description: String!, $date: String!, $location: String!, $organizerId: ID) {
    createEvent(title: $title, description: $description, date: $date, location: $location, organizerId: $organizerId) {
      _id
      title
      description
      date
      location
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation UpdateEvent($id: ID!, $title: String, $description: String, $date: String, $location: String) {
    updateEvent(id: $id, title: $title, description: $description, date: $date, location: $location) {
      _id
      title
      description
      date
      location
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      _id
      title
      description
      date
      location
    }
  }
`;
export const FIND_USER_MUTATION = gql`
  mutation findUserByUsername($username: String!) {
    findUserByUsername(username: $username) {
      id
      username
    }
  }
`;