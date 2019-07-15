import { Query } from 'react-apollo';
import { Game, Match, User, Trick } from './graphqlTypes';

// type Query {
// user(userId: ID!): User
// game(gameId: Int!, userId: ID!): Game
// match(matchId: Int!, userId: ID!): Match
// trick(trickId: Int!): Trick
// activeMatches(userId: ID!): [Match!]!
// activeGames(userId: ID!): [Game!]
// allMatches(userId: ID!): [Match!]
// }

interface UserData {
  user: User;
}

interface UserVariables {
  userId: string;
}

export class UserQuery extends Query<UserData, UserVariables> {}

interface GameData {
  game: Game;
}

interface GameVariables {
  gameId: number;
  user: User;
}

export class GameQuery extends Query<GameData, GameVariables> {}

interface MatchData {
  match: Match;
}

interface MatchVariables {
  matchId: number;
  userId: string;
}

export class MatchQuery extends Query<MatchData, MatchVariables> {}

interface TrickData {
  trick: Trick;
}

interface TrickVariables {
  trickId: number;
}

export class TrickQuery extends Query<TrickData, TrickVariables> {}

interface ActiveGameData {
  activeGames: Game[];
}

interface ActiveGameVariables {
  userId: string;
}

export class ActiveGameQuery extends Query<
  ActiveGameData,
  ActiveGameVariables
> {}

interface ActiveMatchData {
  activeMatches: Match[];
}

interface ActiveMatchVariables {
  userId: string;
}

export class ActiveMatchesQuery extends Query<
  ActiveMatchData,
  ActiveMatchVariables
> {}

interface AllMatchesData {
  allMatches: Match[];
}

interface AllMatchesVariables {
  userId: string;
}

export class AllMatchesQuery extends Query<
  AllMatchesData,
  AllMatchesVariables
> {}
