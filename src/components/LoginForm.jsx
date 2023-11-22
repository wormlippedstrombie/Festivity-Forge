import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../graphql/mutations';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState(null);
  
    const { login } = useAuth();
    const navigate = useNavigate();
  
    const [loginUser, { error }] = useMutation(LOGIN_USER, {
      onError: (err) => {
        console.error('GraphQL error:', err);
        setFormError('Authentication failed. Please check your credentials.');
        setLoading(false);
      },
      onCompleted: (response) => {
        console.log('Login response:', response);
        setLoading(false);
  
        if (response.errors) {
          console.error('GraphQL Errors:', response.errors);
          return;
        }
  
        const loginUserResponse = response?.loginUser;
        if (loginUserResponse) {
          console.log('Login data:', loginUserResponse);
          login(loginUserResponse);
        } else {
          console.error('Invalid login data. Response:', response);
        }
      },
    });
  
    const handleLoginSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        await loginUser({
          variables: {
            username,
            password,
          },
        });
      } catch (err) {
        console.error('Login error:', err);
      }
    };
    
  const onSwitchForm = () => {
    navigate('/register')
    console.log('Switching to registration form');
  };
  
    return (
      <form onSubmit={handleLoginSubmit}>
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
          {loading ? (
            <span>
              Submitting... <i className="fa fa-spinner fa-spin"></i>
            </span>
          ) : (
            'Login'
          )}
        </button>
        {formError && <p style={{ color: 'red' }}>{formError}</p>}
        <p>
        Don't have an account?{' '}
        <button type="button" onClick={() => onSwitchForm('register')}>
          Register
        </button>
      </p>
    </form>
    );
  };

export default LoginForm;