import * as React from 'react';
import { css } from 'glamor';

import { AppHeader } from './AppHeader';
import { CreateGameButton } from './CreateGameButton';
import { MatchList } from './MatchList';

export class Homepage extends React.PureComponent {
  public render() {
    return (
      <div className={appWrapperCss.toString()}>
        <AppHeader />
        <div className={contentWrapperCss.toString()}>
          <MatchList />
          <CreateGameButton />
        </div>
      </div>
    );
  }
}

const appWrapperCss = css({
  textAlign: 'center',
});

const contentWrapperCss = css({ display: 'flex' });
