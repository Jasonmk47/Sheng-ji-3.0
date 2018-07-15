import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

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

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameBoard);
