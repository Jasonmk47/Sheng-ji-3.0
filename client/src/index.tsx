import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from "apollo-cache-inmemory";
import { withClientState } from 'apollo-link-state';

import initialState from './constants/initialState';
import gameResolvers from './services/resolvers/gameResolvers';
import Root from './components/Root';
import registerServiceWorker from './services/registerServiceWorker';

import './styles/index.css';

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  resolvers: gameResolvers,
  defaults: initialState
});

const apolloClient = new ApolloClient({
  cache: cache,
  link: ApolloLink.from([stateLink, new HttpLink()])
});

ReactDOM.render(
  <Root apolloClient={apolloClient} />,
  document.getElementById('root'),
);
registerServiceWorker();
