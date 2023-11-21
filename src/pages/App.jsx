import React, { useState, useEffect } from 'react';
import EventList from '../components/EventList';
import EventForm from '../components/EventForm';
import AuthForm from '../components/Authform';
import '../styles/App.css';

const App = () => {
  // State to manage authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle authentication submission
  const handleAuthSubmit = ({ username, password, isRegister }) => {
    // Implement authentication logic here
    console.log('Authentication submitted:', { username, password, isRegister });
    // Update authentication status if needed
    setIsAuthenticated(true);
  
    // Assuming you receive the token from the server
    const authToken = 'your_received_token';
  
    // Store the token in local storage
    localStorage.setItem('authToken', authToken);
  };

  useEffect(() => {
    // Check if the user is already authenticated
    const storedToken = localStorage.getItem('authToken');
    
    if (storedToken) {
      setIsAuthenticated(true);
    }
  }, []);

  // If not authenticated, render authentication form
  if (!isAuthenticated) {
    return (
      <div>
        <h1>Event Planner</h1>
        <AuthForm onAuthSubmit={handleAuthSubmit} />
      </div>
    );
  }

  // If authenticated, render event-related components
  return (
    <div>
      <h1>Event Planner</h1>
      <EventForm />
      <EventList />
    </div>
  );
};

export default App;