import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import * as cardHelpers from '../../services/cardHelpers';

class Card extends PureComponent {
  render() {
    const { cardId } = this.props;

    return (
      <img
        className={`card=${cardId} ` + cardStyle.toString()}
        src={cardHelpers.getPictureUrlFromCardId(cardId)}
        alt={`${cardHelpers.getCardNameFromCardId(cardId)}`}
      />
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

Card.propTypes = {
  cardId: PropTypes.number.isRequired,
};

const cardStyle = css({
  width: '20%',
  marginRight: '-15%',
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Card);
