import * as React from 'react';
import { css } from 'glamor';

import { CreateGameButton } from './CreateGameButton';

import { AppHeader } from './AppHeader';
import { MatchList } from './MatchList';

export const Homepage = () => (
  <div className={appWrapperCss.toString()}>
    <AppHeader />
    <div className={contentWrapperCss.toString()}>
      <MatchList />

      <CreateGameButton />
    </div>
  </div>
);

const appWrapperCss = css({
  textAlign: 'center',
});

const contentWrapperCss = css({ display: 'flex' });
