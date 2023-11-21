import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER, LOGIN_USER } from '../../graphql/mutations';

const AuthForm = ({ onAuthSubmit, isRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const [submitAuthForm, { error }] = useMutation(
    isRegister ? REGISTER_USER : LOGIN_USER,
    {
      onError: (err) => {
        console.error('GraphQL error:', err);
        setFormError('Authentication failed. Please check your credentials.');
        setLoading(false);
      },
      onCompleted: (response) => {
        console.log('Full response:', response);
        setLoading(false);
      
        if (response.errors) {
          console.error('GraphQL Errors:', response.errors);
          // Handle errors appropriately
          return;
        }
      
        if (isRegister) {
          const authData = response?.data?.registerUser;
          if (authData) {
            console.log('Registration data:', authData);
            onAuthSubmit(authData);
          } else {
            console.error('Invalid registration data. Response:', response);
          }
        } else {
          const loginUserResponse = response?.loginUser;
          console.log(loginUserResponse);
          console.log(response?.loginUser);
          if (loginUserResponse) {
            console.log('Login data:', loginUserResponse);
            onAuthSubmit(loginUserResponse);
          } else {
            console.error('Invalid login data. Response:', response);
          }
        }
      },
    }
  );

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitAuthForm({
        variables: {
          username,
          password,
        },
      });
    } catch (err) {
      console.error('Authentication error:', err);
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
      {formError && <p style={{ color: 'red' }}>{formError}</p>}
    </form>
  );
};

export default AuthForm;