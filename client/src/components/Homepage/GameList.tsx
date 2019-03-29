import * as React from 'react';
import { css } from 'glamor';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import gql from 'graphql-tag';

import { Button } from './Buttons/Button';
import { GameListItem } from './GameListItem';
import { gameRouteBase } from '../../constants/routes';

import { GameListQuery } from '../../types/queryTypes';

const GET_CARD_IDS_IN_HAND = gql`
  query($userId: ID!) {
    allGames(userId: $userId) {
      gameId
      isActive
      currentPoints
    }
  }
`;

export const GameList = React.memo(
  withRouter(({ history }: IProps) => {
    const [selectedGameId, setGameId] = React.useState();

    // Replace line 17 with real DB query
    return (
      <div className={wrapperCss.toString()}>
        <ul className={listCss.toString()}>
          <GameListQuery
            query={GET_CARD_IDS_IN_HAND}
            variables={{ userId: '11111111-1111-1111-1111-111111111111' }}
          >
            {({ loading, error, data }) => {
              if (loading) {
                return null;
              }
              if (error) {
                return `Error with game list retrieval!: ${error}`;
              }
              if (data === undefined || data.allGames === undefined) {
                console.log(data);
                return null;
              }
              return data.allGames.map(game => {
                return (
                  <GameListItem
                    key={game.gameId}
                    gameInfo={game}
                    onClick={() => setGameId(1)}
                  />
                );
              });
            }}
          </GameListQuery>
        </ul>
        <div className={buttonWrapperCss.toString()}>
          <Button
            text={'Join Game'}
            isDisabled={!!selectedGameId}
            onClick={() => {
              // Route to game and then request
              selectedGameId || history.push(gameRouteBase + selectedGameId);
            }}
          />
        </div>
      </div>
    );
  }),
);

interface IProps extends RouteComponentProps<{}> {}

const listCss = css({ listStyle: 'none', padding: '1rem' });

const wrapperCss = css({ flex: '1 1 auto' });

const buttonWrapperCss = css({ flexDirection: 'column', flex: '1 1 auto' });
