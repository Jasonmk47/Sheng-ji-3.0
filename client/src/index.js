import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import ApolloClient from 'apollo-boost';

import { gameReducer as game } from './services/gameReducer';
import { accountReducer as account } from './services/accountReducer';
import './styles/index.css';
import Root from './components/Root';
import registerServiceWorker from './services/registerServiceWorker';

const reducer = combineReducers({ game, account });
const store = createStore(reducer);

const client = new ApolloClient();

ReactDOM.render(
  <Root store={store} apolloClient={client} />,
  document.getElementById('root'),
);
registerServiceWorker();
