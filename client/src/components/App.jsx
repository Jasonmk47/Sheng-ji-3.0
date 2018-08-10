import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import logo from '../logo.svg';

import '../styles/App.css';

class App extends PureComponent {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Sheng Ji</h1>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
