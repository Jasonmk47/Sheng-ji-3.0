import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import appReducer from './services/appReducer.js';
import './styles/index.css';
import Root from './components/Root';
import registerServiceWorker from './services/registerServiceWorker';

const store = createStore(appReducer);

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
registerServiceWorker();
