import * as React from 'react';
import { css } from 'glamor';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Button } from '../Utilities/Buttons/Button';
import { MatchListItem } from './MatchListItem';
import { gameRouteBase } from '../../constants/routes';

import { AllMatchesQuery } from '../../types/queryTypes';
import { GET_ALL_MATCHES } from '../../services/resolvers/queries';

export const MatchList = React.memo(
  withRouter(({ history }: IProps) => {
    const [selectedMatchId, setMatchId] = React.useState();

    return (
      <div className={wrapperCss.toString()}>
        <ul className={listCss.toString()}>
          <AllMatchesQuery
            query={GET_ALL_MATCHES}
            variables={{ userId: '11111111-1111-1111-1111-111111111111' }}
          >
            {({ loading, error, data }) => {
              if (loading) {
                return null;
              }
              if (error) {
                return `Error with game list retrieval!: ${error}`;
              }
              if (data === undefined || data.allMatches === undefined) {
                return null;
              }
              return data.allMatches
                .filter(m => m.isActive)
                .map(match => {
                  return (
                    <MatchListItem
                      key={match.matchId}
                      match={match}
                      onClick={() => setMatchId(match.matchId)}
                      isSelected={match.matchId === selectedMatchId}
                    />
                  );
                });
            }}
          </AllMatchesQuery>
        </ul>
        <div className={buttonWrapperCss.toString()}>
          <Button
            text={'Join Game'}
            isDisabled={!selectedMatchId}
            onClick={() => {
              // Route to game and then request
              selectedMatchId && history.push(gameRouteBase + selectedMatchId);
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
