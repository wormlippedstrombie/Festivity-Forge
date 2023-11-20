import React, { useState } from 'react';

const AuthForm = ({ onAuthSubmit, isRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    // Pass username, password, and isRegister to the parent component
    onAuthSubmit({ username, password, isRegister });
  };

  return (
    <form onSubmit={handleAuthSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
    </form>
  );
};

export default AuthForm;