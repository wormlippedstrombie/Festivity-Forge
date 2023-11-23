import React, { useState, useEffect } from 'react';
import { AuthProvider } from '../context/AuthContext';
import EventList from '../components/EventList';
import EventForm from '../components/EventForm';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import HomePage from '../components/HomePage';
import routes from '../../routes/routes';
import '../styles/App.css';
import { useNavigate,Routes, Route, Outlet, Navigate} from 'react-router-dom';
import Navbar from './Navbar';

const App = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [activeView, setActiveView] = React.useState('home'); // Default to home view
  const navigate = useNavigate();

  const handleAuthSubmit = ({ username, password, isRegister }) => {
    // Implement authentication logic here
    console.log('Authentication submitted:', { username, password, isRegister });
    // Update authentication status if needed
    const authToken = 'your_received_token';
    setIsAuthenticated(true);

    // Store the token in local storage
    localStorage.setItem('authToken', authToken);
    // Change the view to home after successful authentication
    setActiveView('home');
  };

  useEffect(() => {
    // Check if the user is already authenticated
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      setIsAuthenticated(true);
      // Change the view to home if authenticated
      setActiveView('home');
    }
  }, [setIsAuthenticated]);

  const navigateToCreateEvent = () => {
    // Change the view to create event
    setActiveView('createEvent');
    // Use the navigate function to change the URL
    navigate('/create-event');
  };

  return (
    <div>
      <Outlet />
    </div>
  );
};

// Wrap the entire App component with AuthProvider
const AppWithAuth = () => (
  <AuthProvider>
    <Navbar />
      <Routes>
      <Route path="/" element={<HomePage navigateToCreateEvent={App.navigateToCreateEvent} />} />
      <Route path="/create-event" element={<EventForm />} />
      <Route path="/view-events" element={<EventList />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      </Routes>
  </AuthProvider>
);

export default AppWithAuth;