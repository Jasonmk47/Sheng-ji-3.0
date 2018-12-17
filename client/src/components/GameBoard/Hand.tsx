import * as React from 'react';
import { css } from 'glamor';
import gql from 'graphql-tag';

import Card from './Card';
import { HandQuery } from '../../types/queryTypes';

const GET_CARD_IDS_IN_HAND = gql`
  query($matchId: Int!, $userId: ID!) {
    activeGame(matchId: $matchId, userId: $userId) {
      hand
    }
  }
`;

class Hand extends React.PureComponent {
  render() {
    return (
      <div className={'my-hand' + handStyle.toString()}>
        <HandQuery query={GET_CARD_IDS_IN_HAND} variables={{matchId: 2, userId: '11111111-1111-1111-1111-111111111111'}}>
          {({ loading, error, data }) => {
            if (loading) {
              return null;
            }
            if (error) {
              return `Error with card retrieval!: ${error}`;
            }
            if (data === undefined) {
              console.error("No hand returned");
              return;
            }
            return data.activeGame.hand.map(cardId => {
              return <Card key={`card_${cardId}`} cardId={cardId} />;
           });
          }}
        </HandQuery>
      </div>
    );
  }
}

export default Hand;

const handStyle = css({ marginTop: 100 });
