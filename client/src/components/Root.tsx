import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

import { Homepage } from './Homepage/Homepage';
import GameBoard from './GameBoard/GameBoard';
import { gameRouteFull } from '../constants/routes';

class Root extends React.PureComponent<IProps> {
  render() {
    const { apolloClient } = this.props;
    return (
      <ApolloProvider client={apolloClient}>
        <Router>
          <Switch>
            <Route path={gameRouteFull} component={GameBoard} />
            <Route path="/:filter?" component={Homepage} />
          </Switch>
        </Router>
      </ApolloProvider>
    );
  }
}

interface IProps {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

export default Root;
