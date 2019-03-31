import * as React from 'react';
import { css } from 'glamor';
import { Match } from 'src/types/graphqlTypes';
import { assertHasValue } from 'src/services/Throw';

export const MatchListItem = React.memo(({ match, onClick }: IProps) => {
  const { isActive, numPlayers, matchInfos, matchId } = match;

  if (!isActive) {
    return null;
  }

  // TODO get real current user id
  const currentUserId = '11111111-1111-1111-1111-111111111111';

  // Truncate scores if even number of players, else display all scores
  const playerScore = assertHasValue(
    matchInfos.find(mi => mi.user.userId === currentUserId),
    'Tried to show match info for game without user',
  ).userScore;
  const otherPlayerMatchInfos = matchInfos.filter(
    mi => mi.user.userId !== currentUserId,
  );
  const enemyUserMatchInfo = otherPlayerMatchInfos.find(
    opmi => opmi.userScore !== playerScore,
  ); // Find other team by finding different score
  const otherPlayerScores =
    numPlayers % 2 === 1
      ? otherPlayerMatchInfos.map(mi => mi.userScore)
      : [enemyUserMatchInfo ? enemyUserMatchInfo.userScore : playerScore]; // If another team wasnt found by finding a different score, it's tied

  return (
    <li className={listCss.toString()} onClick={onClick}>
      <span>
        Players{' '}
        {matchInfos
          .sort((a, b) => a.orderId - b.orderId)
          .map(mi => mi.user.username)
          .join(', ')}
      </span>
      <span>
        {playerScore} to {otherPlayerScores.join(' to ')}
      </span>
      <span>Match Id: {matchId}</span>
    </li>
  );
});

interface IProps {
  match: Match;
  onClick(): void;
}

const listCss = css({});
