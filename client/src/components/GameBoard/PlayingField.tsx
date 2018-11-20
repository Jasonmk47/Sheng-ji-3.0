import * as React from 'react';

import Card from './Card';
import { CardGroup } from '../../types/cardTypes';

class PlayingField extends React.PureComponent<IProps> {
  renderCardGrouping(cardGroup: CardGroup) {
    return (
      <div key={'played_cards_userId_' + cardGroup.userId}>
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
          return this.renderCardGrouping(cardGroup);
        })}
      </div>
    );
  }
}

interface IProps {
  cardsOnField: CardGroup[]
}

export default PlayingField;
