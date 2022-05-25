import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './index.css';

import App from 'App';
import ErrorBoundary from 'views/ErrorBoundary/ErrorBoundary';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

const container = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
