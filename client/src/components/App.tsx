import * as React from 'react';
import { css } from 'glamor';
import { Redirect } from 'react-router-dom';

class App extends React.PureComponent<{}, IState> {
  state = {
    redirect: false,
    selectedGameId: undefined
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

    if (redirect) {
      if (selectedGameId === undefined) {
        console.error('No game id selected');
      }
      return <Redirect to={'/game/' + selectedGameId} />;
    }

    return null;
  }

  renderActiveGames = () => {
    return (<ul>Game lists go here</ul>);
  }

  render() {
    const { selectedGameId } = this.state;
    return (
      <div className={appStyle.toString()}>
        <header className={appHeader.toString()}>
          <h1>Sheng Ji</h1>
        </header>
          {this.renderActiveGames()}
        <div className={buttonWrapperCss.toString()}>
          {this.renderNewGameRedirect()}
          <button className={buttonCss.toString()} onClick={this.setRedirect}>Create Game</button>
        </div>
        <div className={buttonWrapperCss.toString()}>
          {this.renderGameRedirect()}
          <button className={buttonCss.toString()} onClick={this.setRedirect} disabled={selectedGameId === undefined}>Join Game</button>
        </div>
      </div>
    );
  }
}

export default App;

interface IState {
  redirect: boolean;
  selectedGameId?: number;
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

const buttonWrapperCss = css({
  display: 'block',
  margin: '0 auto',
  marginTop: '20px'
});

// https://codepen.io/scottpdawson/pen/Dqrck
const buttonCss = css({
  ':disabled': {
    'opacity': 0.65,
    'cursor': 'not-allowed'
  },
  marginBottom: '20px',
  textDecoration: 'none',
  border: '1px solid #25729a', 
  WebkitBorderRadius: '3px',
  MozBorderRadius: '3px',
  borderRadius: '3px',
  fontFamily: 'arial, helvetica, sans-serif',
  padding: '10px 10px 10px 10px',
  textShadow: '-1px -1px 0 rgba(0,0,0,0.3)',
  textAlign: 'center',
  color: '#FFFFFF',
  backgroundColor: '#3093c7',
  backgroundImage: '-webkit-gradient(linear, left top, left bottom, color-stop(0%, #3093c7), color-stop(100%, #1c5a85)), -webkit-linear-gradient(top, #3093c7, #1c5a85)',
  ':hover': {
      border: '1px solid #1c5675',
      backgroundColor: '#26759e',
      backgroundImage: '-webkit-gradient(linear, left top, left bottom, color-stop(0%,#26759e), color-stop(100%, #133d5b)), -webkit-linear-gradient(top, #26759e, #133d5b)',
  }
});
