import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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

// TODO: change this from any
interface IProps {
	apolloClient: ApolloClient<any>
}

export default Root;
