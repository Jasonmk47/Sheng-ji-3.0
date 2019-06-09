import { Query } from 'react-apollo';
import { Game, Match, User, Trick } from './graphqlTypes';

// type Query {
//   user(userId: ID!): User
//   game(gameId: Int!): Game
//   match(matchId: Int!, userId: ID!): Match
//   trick(trickId: Int!): Trick
//   activeGame(matchId: Int!, userId: ID!): Game
//   activeMatches(userId: ID!): [Match!]!
//   allGames(userId: ID!): [Game!]
//   allMatches(userId: ID!): [Match!]
//   allMatchGames(matchId: Int!, userId: ID!): [Game!]
// }

interface UserData {
  user: User;
}

interface UserVariables {
  userId: string;
}

export class UserQuery extends Query<UserData, UserVariables> { }

interface GameData {
  game: Game;
}

interface GameVariables {
  gameId: number;
}

export class GameQuery extends Query<GameData, GameVariables> { }

  interface MatchData {
    match: Match;
  }

  interface MatchVariables {
    matchId: number;
    userId: string;
  }

  export class MatchQuery extends Query<MatchData, MatchVariables> { }

interface TrickData {
  trick: Trick
}

interface TrickVariables {
  trickId: number
}

export class TrickQuery extends Query<TrickData, TrickVariables> {}

interface ActiveGameData {
  activeGame: Game;
}

interface ActiveGameVariables {
  matchId: number;
  userId: string;
}

export class ActiveGameQuery extends Query<ActiveGameData, ActiveGameVariables> {}

interface ActiveMatchData {
  activeMatch: Match;
}

interface ActiveMatchVariables {
  matchId: number;
  userId: string;
}

export class ActiveMatchesQuery extends Query<ActiveMatchData, ActiveMatchVariables> {}

interface AllGamesData {
  allGames: Game[];
}

interface AllGamesVariables {
  userId: string;
}

export class AllGamesQuery extends Query<AllGamesData, AllGamesVariables> {}

interface AllMatchesData {
  allMatches: Match[];
}

interface AllMatchesVariables {
  userId: string;
}

export class AllMatchesQuery extends Query<AllMatchesData, AllMatchesVariables> { }

interface AllMatchGamesData {
  allMatchGames: Game[];
}

interface AllMatchGamesVariables {
  matchId: number,
  userId: string;
}

export class AllMatchGamesQuery extends Query<AllMatchGamesData, AllMatchGamesVariables> { }

