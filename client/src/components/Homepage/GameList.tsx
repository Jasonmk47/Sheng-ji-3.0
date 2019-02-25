import * as React from 'react';
import { css } from 'glamor';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Button } from './Buttons/Button';
import { GameListItem } from './GameListItem';
import { gameRouteBase } from '../../constants/routes';

export const GameList = React.memo(
  withRouter(({ history }: IProps) => {
    const [selectedGameId, setGameId] = React.useState();

    // Replace line 17 with real DB query
    return (
      <div className={wrapperCss.toString()}>
        <ul className={listCss.toString()}>
          <GameListItem gameId={1} onClick={() => setGameId(1)} />
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

const wrapperCss = css({});

const buttonWrapperCss = css({ flexDirection: 'column', flex: '1 1 auto' });
