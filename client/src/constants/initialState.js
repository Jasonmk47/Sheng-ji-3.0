import { suits } from './enums.js';

const Account = {};

//These fields will have to be initialized on game load
const Game = {
  currentGameId: -1,
  // Cards selected will be handled in component state
  display: {
    cardsVisible: [],
    cardsInHand: [],
  },
  boardState: {
    trumpSuit: suits.jokers,
    trumpNumber: -1,
    selfPoints: 0,
    teamPoints: 0,
    currentPlayerId: -1,
  },
};

export const initialState = {
  account: Account,
  game: Game,
};
