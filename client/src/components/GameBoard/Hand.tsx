import * as React from 'react';
import { css } from 'glamor';
import gql from 'graphql-tag';

import Card from './Card';
import { HandQuery } from '../../types/queryTypes';

const GET_CARD_IDS_IN_HAND = gql`
  query {
    Game @client {
      display {
        cardIdsInHand
      }
    }
  }
`;

class Hand extends React.PureComponent {
  render() {
    return (
      <div className={'my-hand' + handStyle.toString()}>
        <HandQuery query={GET_CARD_IDS_IN_HAND}>
          {({ loading, error, data }) => {
            if (loading) {
              return null;
            }
            if (error) {
              return `Error with card retrieval!: ${error}`;
            }
            console.log(data);
            return <Card key={`card_0`} cardId={1} />;

//            return data.Game.display.cardIdsInHand.map(cardId => {
  //            return <Card key={`card_${cardId}`} cardId={cardId} />;
    //        });
          }}
        </HandQuery>
      </div>
    );
  }
}

export default Hand;

const handStyle = css({ marginTop: 100 });
