import { Suits, PlayTypes } from '../constants/enums';

//  Keep in line with .graphql
export interface User {
  userId: string;
  username: string;
}

export interface Match {
  matchId: number;
  matchName: string;
  isActive: boolean;
  numPlayers: number;
  currentGame: Game;
  allGames: Game[];
  matchInfos: MatchInfo[];
}

export interface MatchInfo {
  user: User;
  userScore: number;
  orderId: number;
}

export interface Game {
  gameId: number;
  matchId: number;
  isActive: boolean;
  trumpSuit?: Suits;
  trumpNumber?: number;
  startingUserId?: string;
  bottomSettingUserId?: string;
  bottomCardIds: number[];
  gameInfos: GameInfo[];
  playedTricks: Trick[];
}

export interface GameInfo {
  user: User;
  currentPoints: number;
  hand: number[];
}

export interface Trick {
  trickId: number;
  gameId: number;
  // orderId: number;
  startingUserId: string;
  winningUserId: string;
  playType: PlayTypes;
  trickInfos: TrickInfo[];
}

export interface TrickInfo {
  userId: number;
  playedCardIds: number[];
}
