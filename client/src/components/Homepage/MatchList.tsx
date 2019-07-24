import * as React from 'react';
import { css } from 'glamor';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { MatchListItem } from './MatchListItem';
import { gameRouteBase } from '../../constants/routes';

import { AllMatchesQuery } from '../../types/queryTypes';
import { GET_ALL_MATCHES } from '../../services/graphqlServices/queries';

export const MatchList = React.memo(
  withRouter(({ history }: IProps) => {
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
                      onClick={() => {
                        // Route to game and then request
                        history.push(gameRouteBase + 1);
                      }}
                    />
                  );
                });
            }}
          </AllMatchesQuery>
        </ul>
      </div>
    );
  }),
);

interface IProps extends RouteComponentProps<{}> {}

const listCss = css({ listStyle: 'none', padding: '1rem', width: '300px' });

const wrapperCss = css({ flex: '1 1 auto' });
