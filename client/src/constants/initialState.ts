import { suits } from './enums';

const Account = {
  __typename: 'Account',
  userId: null,
};

// These fields will have to be initialized on game load
const Game = {
  currentGameId: -1,
  // Cards selected will be handled in component state
  display: {
    cardIdsVisible: [
      { userId: 1, cardIds: [7, 8] },
      { userId: 2, cardIds: [9, 10] },
    ],
    cardIdsInHand: [1, 2, 3],
    __typename: 'Display',
  },
  boardState: {
    trumpSuit: suits.jokers,
    trumpNumber: -1,
    selfPoints: 0,
    teamPoints: 0,
    currentPlayerId: -1,
    __typename: 'Board',
  },
  __typename: 'Game',
};

export default { account: Account, game: Game };
