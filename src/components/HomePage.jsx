import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const navigateToCreateEvent = () => {
    navigate('/create-event');
  };

  return (
    <div>
      <h1>Welcome to the Event Manager</h1>
      <button onClick={navigateToCreateEvent}>Create Event</button>
    </div>
  );
};

export default HomePage;