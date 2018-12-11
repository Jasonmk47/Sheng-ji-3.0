import * as React from 'react';
import { css } from 'glamor';

import PlayingField from './PlayingField';
import Hand from './Hand';
import { Redirect } from 'react-router-dom';

class GameBoard extends React.PureComponent<{}, {}> {
  state = {
    toHome: false,
  };

  setRedirect = () => {
    this.setState({
      toHome: true,
    });
  };

  renderRedirect = () => {
    if (this.state.toHome) {
      return <Redirect to={'/'} />;
    }
    return null;
  };

  render() {
    return (
      <div className="game-board">
        <div className={buttonWrapper.toString()}>
          {this.renderRedirect()}
          <button onClick={this.setRedirect}>Back to Home</button>
        </div>
        Game Board
        <PlayingField />
        <Hand />
      </div>
    );
  }
}

export default GameBoard;

const buttonWrapper = css({});
