import * as React from 'react';
import { css } from 'glamor';
import { Match } from '../../types/graphqlTypes';
import { assertHasValue } from '../../services/Throw';

export const MatchListItem = React.memo(
  ({ match, onClick, isSelected }: IProps) => {
    const { numPlayers, matchInfos, matchId } = match;

    const sortedMatchInfos = matchInfos.sort((a, b) => a.orderId - b.orderId);

    // TODO get real current user id
    const currentUserId = '11111111-1111-1111-1111-111111111111';

    // Truncate scores if even number of players, else display all scores
    const playerScore = assertHasValue(
      sortedMatchInfos.find(mi => mi.user.userId === currentUserId),
      'Tried to show match info for game without user',
    ).userScore;

    const hasTwoTeams = numPlayers % 2 !== 1;

    const isTied = !sortedMatchInfos.some(mi => mi.userScore !== playerScore);

    // If another team wasnt found by finding a different score, it's tied
    const otherPlayersScores = !hasTwoTeams
      ? sortedMatchInfos
          .filter(mi => mi.user.userId === currentUserId)
          .map(mi => mi.userScore)
      : isTied
      ? [playerScore]
      : [sortedMatchInfos.find(mi => mi.userScore !== playerScore)!.userScore];

    return (
      <li
        className={css(listItemCss, isSelected && selectedCss).toString()}
        onClick={onClick}
      >
        <div>
          <div>Match Id: {matchId}</div>
          <span>Players: </span>
          {matchInfos
            .sort((a, b) => a.orderId - b.orderId)
            .map(mi => mi.user.username)
            .join(', ')}
        </div>
        <div>
          {playerScore} to {otherPlayersScores.join(' to ')}
        </div>
      </li>
    );
  },
);

interface IProps {
  match: Match;
  onClick(): void;
  isSelected: boolean;
}

const listItemCss = css({
  marginTop: '5px',
  cursor: 'pointer',
  border: 'solid',
  borderRadius: '8px',
  padding: '5px',
});

const selectedCss = css({ color: 'red', cursor: 'context-menu' });
