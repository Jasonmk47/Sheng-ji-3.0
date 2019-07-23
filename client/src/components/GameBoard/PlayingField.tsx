import * as React from 'react';
import gql from 'graphql-tag';

import Card from './Card';
import { CardGroup } from '../../types/cardTypes';
import { FieldQuery } from '../../types/localQueryTypes';

const GET_CARD_IDS_ON_FIELD = gql`
  query {
    game @client {
      display {
        cardGroupsVisible {
          userId
          cardIds
        }
      }
    }
  }
`;

class PlayingField extends React.PureComponent {
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
    return (
      <div className="playing-field">
        <FieldQuery query={GET_CARD_IDS_ON_FIELD}>
          {({ loading, error, data }) => {
            if (loading) {
              return null;
            }
            if (error) {
              return `Error with field card retrieval!: ${error}`;
            }
            if (data === undefined) {
              console.error('No playing fiend returned');
              return;
            }
            return data.game.display.cardGroupsVisible.map(cardGroup => {
              return cardGroup.cardIds.map(cardId => (
                <Card key={`card_${cardId}`} cardId={cardId} />
              ));
            });
          }}
        </FieldQuery>
      </div>
    );
  }
}

export default PlayingField;
