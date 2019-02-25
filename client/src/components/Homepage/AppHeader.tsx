import * as React from 'react';
import { css } from 'glamor';

export const AppHeader = React.memo(() => (
  <header className={appHeaderCss.toString()}>
    <h1>Sheng Ji</h1>
  </header>
));

const appHeaderCss = css({
  backgroundColor: '#222',
  height: '150px',
  padding: '20px',
  color: 'white',
});
