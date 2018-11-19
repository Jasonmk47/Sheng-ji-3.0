import React, { PureComponent } from 'react';

import PlayingField from './PlayingField';
import Hand from './Hand';

class GameBoard extends PureComponent {
  render() {
    // TODO: remove
    var test = [];
    test[0] = {cardIds: [1]}

    return (
      <div className="game-board">
        Game Board
        <PlayingField cardsOnField={test} />
        <Hand />
      </div>
    );
  }
}

export default GameBoard;
