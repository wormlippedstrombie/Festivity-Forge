import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER, LOGIN_USER } from '../../graphql/mutations';

const AuthForm = ({ onAuthSubmit, isRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Use REGISTER_USER and LOGIN_USER directly
  const [submitAuthForm, { loading, error }] = useMutation(
    isRegister ? REGISTER_USER : LOGIN_USER,
    {
      onError: (error) => {
        console.error('GraphQL error:', error);
      },
    }
  );

  const handleAuthSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await submitAuthForm({
        variables: {
          username,
          password,
        },
      });
      
      const data = response?.data

      console.log('Authentication data:', data);
      onAuthSubmit(data);
    } catch (error) {
      console.error('Authentication error:', error);
    }
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
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : isRegister ? 'Register' : 'Login'}
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default AuthForm;