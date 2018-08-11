import React, { PureComponent } from 'react';

import Card from './Card';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_CARD_IDS_IN_HAND = gql`
  query {
      Game @client {
        display {
          cardIdsInHand
        }
      }
    }
`;

class Hand extends PureComponent {
  render() {
    return (
      <div className={'my-hand'}>
      <Query query={GET_CARD_IDS_IN_HAND}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error with card retrieval!: ${error}`;
          return (
            data.Game.display.cardIdsInHand.map(cardId => {
              return <Card key={`card_${cardId}`} cardId={cardId} />;
            })
          );
        }}
      </Query>
      </ div>
    );
  }
}

export default Hand;
