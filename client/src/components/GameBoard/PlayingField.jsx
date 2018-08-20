import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Card from './Card';

class PlayingField extends PureComponent {
  renderCardGrouping(cardGroup) {
    return (
      <div key={'userId' + cardGroup.userId}>
        {cardGroup.cardIds.map(cardId => (
          <Card key={`card_${cardId}`} cardId={cardId} />
        ))}
      </div>
    );
  }

  render() {
    const { cardsOnField } = this.props;
    return (
      <div className="playing-field">
        {cardsOnField.map(cardGroup => {
          return this.renderCardGrouping(cardGroup.cardIds);
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cardsOnField: state.game.display.cardIdsVisible,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

PlayingField.propTypes = {
  cardsOnField: PropTypes.array.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayingField);
