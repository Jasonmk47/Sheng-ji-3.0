import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './App';
import GameBoard from './GameBoard/GameBoard';

class Root extends React.PureComponent {
  render() {
    const { store, apolloClient } = this.props;
    return (
      <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/game/:filter?" component={GameBoard} />
            <Route path="/:filter?" component={App} />
          </Switch>
        </Router>
      </Provider>
      </ApolloProvider>
    );
  }
}

Root.propTypes = { store: PropTypes.object, apolloClient: PropTypes.object };

export default Root;
