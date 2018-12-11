import * as React from 'react';
import { css } from 'glamor';
import { Redirect } from 'react-router-dom';

class App extends React.PureComponent<{}, IState> {
  state = {
    redirect: false,
  };

  setRedirect = () => {
    this.setState({
      redirect: true,
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={'/game/'} />;
    }
    return null;
  };

  render() {
    return (
      <div className={appStyle.toString()}>
        <header className={appHeader.toString()}>
          <h1>Sheng Ji</h1>
        </header>
        <div className={buttonWrapper.toString()}>
          {this.renderRedirect()}
          <button onClick={this.setRedirect}>Create Game</button>
        </div>
        <div className={buttonWrapper.toString()}>
          {this.renderRedirect()}
          <button onClick={this.setRedirect}>Join Game</button>
        </div>
      </div>
    );
  }
}

export default App;

interface IState {
  redirect: boolean;
}

const appStyle = css({
  textAlign: 'center',
});

const appHeader = css({
  backgroundColor: '#222',
  height: '150px',
  padding: '20px',
  color: 'white',
});

const buttonWrapper = css({});
