import * as React from 'react';
import { css } from 'glamor';
import { Redirect } from 'react-router-dom';

class App extends React.PureComponent<{}, IState> {
  state = {
    redirect: false,
    selectedGameId: '',
  };

  setRedirect = () => {
    this.setState({
      redirect: true,
    });
  };

  renderGameRedirect = () => {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to={'/game/'} />;
    }
    return null;
  };

  renderNewGameRedirect = () => {
    const { redirect, selectedGameId } = this.state;

    if (selectedGameId === '') {
      console.error('Had no selected game')
    }

    if (redirect) {
      return <Redirect to={'/game/' + selectedGameId} />;
    }
    return null;
  }

  render() {
    const { selectedGameId } = this.state;
    return (
      <div className={appStyle.toString()}>
        <header className={appHeader.toString()}>
          <h1>Sheng Ji</h1>
        </header>
        <div className={buttonWrapper.toString()}>
          {this.renderNewGameRedirect()}
          <button onClick={this.setRedirect}>Create Game</button>
        </div>
        <div className={buttonWrapper.toString()}>
          {this.renderGameRedirect()}
          <button onClick={this.setRedirect} disabled={selectedGameId === ''}>Join Game</button>
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
