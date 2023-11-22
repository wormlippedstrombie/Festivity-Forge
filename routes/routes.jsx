import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from '../src/components/HomePage';
import LoginForm from '../src/components/LoginForm';
import RegisterForm from '../src/components/RegisterForm';
import EventForm from '../src/components/EventForm';
import EventList from '../src/components/EventList';

export default [
    <Route path= '/' component={HomePage} exact key='home' />,
    <Route path= '/login' component={LoginForm} exact key='login' />,
    <Route path= '/register' component={RegisterForm} exact key='register' />,
    <Route path= '/create-event' component={EventForm} exact key='create event' />,
    <Route path= '/view-events' component={EventList} exact key='view events' />,
];