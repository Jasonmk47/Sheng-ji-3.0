// Keep in sync with the enums in graphql
export const suits = {
  clubs: 0,
  diamonds: 1,
  hearts: 2,
  spades: 3,
  jokers: 4,
};

export const plays = {
  single: 0,
  pair: 1,
  consecutivePair: 2,
  shuai: 3,
};

export enum PlayTypes {
  single = 1,
  pair,
  consecutivePair,
  shuai
}

export enum Suits {
  clubs = 0,
  diamonds,
  hearts,
  spades,
  jokers,
}