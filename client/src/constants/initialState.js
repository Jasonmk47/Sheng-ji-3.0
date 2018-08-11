import { suitTypes } from './enums.js';

const Account = {
  userId: null,
  __typename: 'Account',
};

//These fields will have to be initialized on game load
const Game = {
  currentGameId: -1,
  // Cards selected will be handled in component state
  display: {
    cardIdsVisible: [],
    cardIdsInHand: [1, 2, 3],
    __typename: 'Display',
  },
  boardState: {
    trumpSuit: suitTypes.jokers,
    trumpNumber: -1,
    selfPoints: 0,
    teamPoints: 0,
    currentPlayerId: -1,
    __typename: 'Board',
  },
  __typename: 'Game',
};

export default { account: Account, Game: Game };
