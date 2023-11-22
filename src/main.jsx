import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './pages/App.jsx';
import { AuthProvider } from './context/AuthContext.jsx'
import './styles/index.css';

const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />,
  },
]);

// Create an Apollo Client instance
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

// Use createRoot from react-dom/client
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap your app with ApolloProvider, RouterProvider, and AuthProvider */}
    <ApolloProvider client={client}>
      <RouterProvider router={router}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </RouterProvider>
    </ApolloProvider>
  </React.StrictMode>
);