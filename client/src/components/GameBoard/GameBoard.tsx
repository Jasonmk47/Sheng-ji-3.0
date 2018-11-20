import * as React from 'react';

import PlayingField from './PlayingField';
import Hand from './Hand';

class GameBoard extends React.PureComponent  {
  render() {
    // TODO: remove
    const test = [];
    test[0] = {cardIds: [1], userId: 'test'}

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
