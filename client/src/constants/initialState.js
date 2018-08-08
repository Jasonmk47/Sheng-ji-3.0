import { suitTypes } from './enums.js';

export const Account = {
  userId: null,
};

//These fields will have to be initialized on game load
export const Game = {
  currentGameId: -1,
  // Cards selected will be handled in component state
  display: {
    cardIdsVisible: [],
    cardIdsInHand: [1, 2, 3],
  },
  boardState: {
    trumpSuit: suitTypes.jokers,
    trumpNumber: -1,
    selfPoints: 0,
    teamPoints: 0,
    currentPlayerId: -1,
  },
};
