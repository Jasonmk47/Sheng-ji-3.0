import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import initialState from '../constants/initialState';

import './styles/index.css';
import Root from './components/Root';
import registerServiceWorker from './services/registerServiceWorker';
		
const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link:  new HttpLink(),
    clientState: {
        defaults: initialState,
        resolvers: {
            Mutation: {},
        },
        typeDefs: 'schema goes here'
    },
});

ReactDOM.render(<Root apolloClient={apolloClient}/>, document.getElementById('root'));
registerServiceWorker();
