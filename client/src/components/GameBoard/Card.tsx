import { css } from 'glamor';
import * as React from 'react';

import * as cardHelpers from '../../services/cardHelpers';

class Card extends React.PureComponent<IProps> {
  public state = { 
    isSelected: false
  };
  public render() {
    const { cardId } = this.props;

    return (
      <img
        className={`card=${cardId} ` + cardStyle.toString()}
        src={cardHelpers.getPictureUrlFromCardId(cardId)}
        alt={cardHelpers.getCardNameFromCardId(cardId)}
      />
    );
  }
}

interface IProps {
  cardId: number
}

const cardStyle = css({
  width: '10%',
});

export default Card;
