import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../graphql/mutations';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState(null);
  
    const { login } = useAuth();
    const navigate = useNavigate();
  
    const [registerUser, { error }] = useMutation(REGISTER_USER, {
      onError: (err) => {
        console.error('GraphQL error:', err);
        setFormError('Registration failed. Please try again.');
        setLoading(false);
      },
      onCompleted: (response) => {
        console.log('Registration response:', response);
        setLoading(false);
  
        if (response.errors) {
          console.error('GraphQL Errors:', response.errors);
          return;
        }
  
        const authData = response?.registerUser;
        if (authData) {
          console.log('Registration data:', authData);
          login(authData);
        } else {
          console.error('Invalid registration data. Response:', response);
        }
      },
    });
  
    const handleRegisterSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        await registerUser({
          variables: {
            username,
            password,
          },
        });
      } catch (err) {
        console.error('Registration error:', err);
      }
    };
    
    const onSwitchForm = () => {
        navigate('/login')
        console.log('Switching to login form');
      };
      
  
    return (
      <form onSubmit={handleRegisterSubmit}>
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
            'Register'
          )}
        </button>
        {formError && <p style={{ color: 'red' }}>{formError}</p>}
        <p>
          Already have an account?{' '}
          <button type="button" onClick={() => onSwitchForm('login')}>
            Login
          </button>
        </p>
      </form>
    );
  };

export default RegisterForm;