import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './App';
import GameBoard from './GameBoard/GameBoard';

class Root extends React.PureComponent {
  render() {
    const { apolloClient } = this.props;
    return (
      <ApolloProvider client={apolloClient}>
        <Router>
          <Switch>
            <Route path="/game/:filter?" component={GameBoard} />
            <Route path="/:filter?" component={App} />
          </Switch>
        </Router>
      </ApolloProvider>
    );
  }
}

Root.propTypes = { apolloClient: PropTypes.object };

export default Root;
