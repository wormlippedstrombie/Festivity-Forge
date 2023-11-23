import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const navigateToCreateEvent = () => {
    navigate('/create-event');
  };

  return (
    <div>
      <h1>Welcome to Festivity Forge</h1>
       <p>This was a site created to allow users to create and manage their own events in one place while also providing people with a place to see events happening near them and get out there and socialise with the rest of the world</p>
    </div>
  );
};

export default HomePage;