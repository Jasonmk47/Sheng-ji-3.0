import * as React from 'react';
import { css } from 'glamor';
import gql from 'graphql-tag';

import Card from './Card';
import { HandQuery } from '../../types/queryTypes';

const GET_CARD_IDS_IN_HAND = gql`
  query {
    activeGame($matchId: Int!, $userId: ID!) {
      hand
    }
  }
`;

class Hand extends React.PureComponent {
  render() {
    return (
      <div className={'my-hand' + handStyle.toString()}>
        <HandQuery query={GET_CARD_IDS_IN_HAND} variables={{matchId: 5, userId: 'c9ed1627-cf1d-40ed-9c59-668f91c2789c'}}>
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
            return data.hand.map(cardId => {
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
