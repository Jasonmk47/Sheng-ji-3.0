import * as React from 'react';
import { css } from 'glamor';

export const GameListItem = React.memo(({ gameId, onClick }: IProps) => {
  return (
    <li className={listCss.toString()} onClick={onClick}>
      Players: 1,2,3,4 Score: 4s {gameId}
    </li>
  );
});

interface IProps {
  gameId: number;
  onClick(): void;
}

const listCss = css({});
