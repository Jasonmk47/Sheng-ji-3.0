import * as React from 'react';
import { css } from 'glamor';

import Card from './Card';
import { ActiveGameQuery } from '../../types/queryTypes';
import { assertHasValue } from 'src/services/Throw';
import { GET_ACTIVE_GAMES } from 'src/services/resolvers/queries';

class Hand extends React.PureComponent {
  render() {
    // TODO real user Id
    const currentUserId = '11111111-1111-1111-1111-111111111111';
    return (
      <div className={'my-hand' + handStyle.toString()}>
        <ActiveGameQuery
          query={GET_ACTIVE_GAMES}
          variables={{
            userId: currentUserId,
          }}
        >
          {({ loading, error, data }) => {
            if (loading) {
              return null;
            }
            if (error) {
              return `Error with card retrieval!: ${error}`;
            }
            if (data === undefined) {
              console.error('No hand returned');
              return;
            }
            return assertHasValue(
              data.activeGames[0].gameInfos.find(
                gi => gi.user.userId === currentUserId,
              ),
              'Active game does not include current user',
            ).hand.map(cardId => {
              return <Card key={`card_${cardId}`} cardId={cardId} />;
            });
          }}
        </ActiveGameQuery>
      </div>
    );
  }
}

export default Hand;

const handStyle = css({ marginTop: 100 });
