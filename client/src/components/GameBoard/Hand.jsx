import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Card from './Card';

class Hand extends PureComponent {
  render() {
    const { cardIdsInHand } = this.props;
    return (
      <div className="my-hand">
        {cardIdsInHand.map(cardId => {
          return <Card key={`card_${cardId}`} cardId={cardId} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cardIdsInHand: state.game.display.cardIdsInHand,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

Hand.propTypes = {
  cardIdsInHand: PropTypes.array.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Hand);
