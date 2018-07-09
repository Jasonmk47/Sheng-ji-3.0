import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';

import {
  gameReducer as game,
  accountReducer as account,
} from './services/appReducer';
import './styles/index.css';
import Root from './components/Root';
import registerServiceWorker from './services/registerServiceWorker';

const reducer = combineReducers({ game, account });
const store = createStore(reducer);

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
registerServiceWorker();
