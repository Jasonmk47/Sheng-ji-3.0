// Keep in sync with the enums in graphql
export enum PlayTypes {
  single = 0,
  pair,
  consecutivePair,
  shuai,
}

export enum Suits {
  clubs = 0,
  diamonds,
  hearts,
  spades,
  jokers,
}

export enum ModalType {
  none = 0,
  createGame,
  login,
}

// First value is default
export const SupportedNumPlayers = [4, 5];

// First value is default
export const SupportedNumDecks = [2, 1];
