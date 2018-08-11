import React, { PureComponent } from 'react';

import Hand from './Hand';

class GameBoard extends PureComponent {
  render() {
    return (
      <div className="game-board">
        Game Board
        <Hand />
      </div>
    );
  }
}

export default GameBoard;
