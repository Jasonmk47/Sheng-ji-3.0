import React, { PureComponent } from 'react';

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

export default PlayingField;
