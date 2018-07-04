import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import logo from './logo.svg';

import './styles/App.css';

class App extends PureComponent {
  state = {
    response: '',
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Sheng Ji</h1>
        </header>
        <p className="App-intro">{this.state.response}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return;
};

const mapDispatchToProps = dispatch => {
  return;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
