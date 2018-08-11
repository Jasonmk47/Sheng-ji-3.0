import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';

import './styles/index.css';
import Root from './components/Root';
import registerServiceWorker from './services/registerServiceWorker';

import initialState from './constants/initialState';

const client = new ApolloClient({
  clientState: {
    defaults: initialState,
    resolvers: {
      Mutation: {},
    },
  },
});

ReactDOM.render(
  <Root apolloClient={client} />,
  document.getElementById('root'),
);
registerServiceWorker();
