import * as React from 'react';
import { css } from 'glamor';
import gql from 'graphql-tag';

import Card from './Card';
import { HandQuery } from '../../types/queryTypes';

const GET_CARD_IDS_IN_HAND = gql`
  query {
    activeGame($matchId: Int!, $userId: ID!)  {
      hand
    }
  }
`;

class Hand extends React.PureComponent {
  render() {
    return (
      <div className={'my-hand' + handStyle.toString()}>
        <HandQuery query={GET_CARD_IDS_IN_HAND} variables={{}}>
          {({ loading, error, data }) => {
            if (loading) {
              return null;
            }
            if (error) {
              return `Error with card retrieval!: ${error}`;
            }
            console.log(data);
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
