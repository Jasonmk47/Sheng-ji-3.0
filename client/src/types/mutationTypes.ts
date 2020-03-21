import { Mutation } from 'react-apollo';
import { Match } from './graphqlTypes';

// type Mutation {
// createMatch(
//     userId: ID!
//     numPlayers: Int!
//     numDecks: Int!
//     matchName: String!
//   ): Match
//  joinMatch(userId: ID!, matchId: Int): Match
// playCards(userId: ID!, cardIds: [Int!]!, gameId: Int!): Trick
// callSuit(userId: ID!, gameId: Int!, suitType: Int!): Game
// flipSuit(userId: ID!, gameId: Int!, suitType: Int!): Game
// setBottom(userId: ID!, gameId: Int!, cardIds: [Int!]!): Game
// }

export interface CreateMatchData {
  match: Match;
}

interface CreateMatchVariables {
  userId: string;
  numPlayers: number;
  numDecks: number;
  matchName: string;
}

export class CreateMatchMutation extends Mutation<
  CreateMatchData,
  CreateMatchVariables
> {}

export interface CreateUserData {
  userId: string;
}

interface CreateUserVariables {
  username: string;
  password: string;
}

export class CreateUserMutation extends Mutation<
  CreateUserData,
  CreateUserVariables
> {}
