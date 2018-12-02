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
    cardGroupsVisible: [
      { userId: 1, cardIds: [30, 31], __typename: "CardGroup" },
      { userId: 2, cardIds: [32, 33], __typename: "CardGroup" },
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
