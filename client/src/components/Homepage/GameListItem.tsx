import * as React from 'react';
import { css } from 'glamor';
import { GameInfo } from 'src/types/gameInfo';
import { assertHasValue } from 'src/services/Throw';

export const GameListItem = React.memo(({ gameInfo, onClick }: IProps) => {
  const { usernames, userScores, gameId } = gameInfo;

  // TODO replace with real userid
  const currentUserId = '11111111-1111-1111-1111-111111111111';
  const otherUsernames = [...usernames.entries()].filter(
    userIdToUsername => userIdToUsername.keys()[0] !== currentUserId,
  );
  const playerScore = assertHasValue(
    userScores.get(currentUserId),
    `Couldn't find current user's score in game: ${gameId}`,
  );

  // Truncate scores if even number of players, else display all scores
  const otherPlayerScores =
    otherUsernames.length % 2 === 1
      ? [[...userScores.values()].find(s => s !== playerScore) || playerScore]
      : [...userScores.entries()].filter(
          userIdToScore => userIdToScore.keys()[0] !== playerScore,
        );

  return (
    <li className={listCss.toString()} onClick={onClick}>
      <span>Players {otherUsernames.join(', ')}</span>
      <span>
        {playerScore} to {otherPlayerScores.join(' to ')}
      </span>
      <span>GameId: {gameId}</span>
    </li>
  );
});

interface IProps {
  gameInfo: GameInfo;
  onClick(): void;
}

const listCss = css({});
