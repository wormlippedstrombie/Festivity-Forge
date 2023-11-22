import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthForm = ({ isRegister }) => {
  const [activeForm, setActiveForm] = useState(isRegister ? 'register' : 'login');

  const handleSwitchForm = (formType) => {
    setActiveForm(formType);
  };

  return (
    <div>
      {activeForm === 'login' ? (
        <LoginForm onSwitchForm={handleSwitchForm} />
      ) : (
        <RegisterForm onSwitchForm={handleSwitchForm} />
      )}
    </div>
);
};

export default AuthForm;