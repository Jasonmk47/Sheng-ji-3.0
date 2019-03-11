import * as React from 'react';
import { css } from 'glamor';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Button } from './Button';
import { GameMatchParams } from '../../../types/routeTypes';
import { gameRouteCreate } from '../../../constants/routes';

export const CreateGameButton = React.memo(
  withRouter(({ history }: IProps) => (
    <div className={wrapperCss.toString()}>
      <Button
        text={'Create Game'}
        onClick={() => {
          // Send request to make a new game
          history.push(gameRouteCreate);
        }}
      />
    </div>
  )),
);

interface IProps extends RouteComponentProps<GameMatchParams> {}

const wrapperCss = css({ flexDirection: 'column', flex: '1 1 auto' });
