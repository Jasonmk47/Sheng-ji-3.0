import React, { PureComponent } from 'react';

import PlayingField from './PlayingField';
import Hand from './Hand';

class GameBoard extends PureComponent {
  render() {
    return (
      <div className="game-board">
        Game Board
        <PlayingField />
        <Hand />
      </div>
    );
  }
}

export default GameBoard;
