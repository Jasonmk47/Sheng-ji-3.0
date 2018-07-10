import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class GameBoard extends PureComponent {
  render() {
    return <div className="GameBoard"> Test Board</div>;
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
