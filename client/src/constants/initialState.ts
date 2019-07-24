import { Suits, ModalType } from './enums';

const Account = {
  __typename: 'Account',
  userId: null,
};

// TODO remove this for the remote one instaed
const Game = {
  currentGameId: -1,
  // Cards selected will be handled in component state
  display: {
    cardGroupsVisible: [
      { userId: 1, cardIds: [30, 31], __typename: 'CardGroup' },
      { userId: 2, cardIds: [32, 33], __typename: 'CardGroup' },
    ],
    __typename: 'Display',
  },
  boardState: {
    trumpSuit: Suits.jokers,
    trumpNumber: -1,
    selfPoints: 0,
    teamPoints: 0,
    currentPlayerId: -1,
    __typename: 'Board',
  },
  __typename: 'Game',
};

const Modal = {
  isOpen: false,
  type: ModalType.none,
  __typename: 'Modal',
};

export default { account: Account, game: Game, modal: Modal };
