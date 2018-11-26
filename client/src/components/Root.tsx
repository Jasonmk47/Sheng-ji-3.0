import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';

import App from './App';
import GameBoard from './GameBoard/GameBoard';

class Root extends React.PureComponent<IProps> {
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

interface IProps {
	apolloClient: ApolloClient<NormalizedCacheObject>;
}

export default Root;
