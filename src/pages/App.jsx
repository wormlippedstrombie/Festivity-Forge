import React, { useState } from 'react';
import EventList from '../components/EventList';
import AuthForm from '../components/AuthForm';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import '../styles/App.css';

const App = () => {
  const [count, setCount] = useState(0);

  const events = [
    { id: 1, name: 'Event 1' },
    { id: 2, name: 'Event 2' },
    // Add more events as needed
  ];

  const handleAuthSubmit = (userData) => {
    // Implement authentication logic based on isRegister flag
    console.log(userData);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div>
        <h1>Your Event Manager App</h1>
        <EventList events={events} />
        <AuthForm onAuthSubmit={handleAuthSubmit} isRegister={false} />
        {/* Set isRegister to true for registration form */}
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default App;
