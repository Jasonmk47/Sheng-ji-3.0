const schema =
  ' \
type User { \
  userId: ID! \
  username: String! \
  activeMatchIds: [Int!] \
} \
type Match { \
  matchId: ID! \
  isActive: Boolean! \
  userIds: [ID!]! \
  gameIds: [Int!]! \
} \
type Game { \
  gameId: ID! \
  matchId: Int! \
  isActive: Boolean! \
  trumpSuit: Int \
  trumpNumber: Int \
  startingUserId: ID \
  tricks: [Tricks]! \
} \
type Tricks { \
  trickId: Int! \
  startingUserId: ID! \
  winningUserId: ID \
  playedCardIds: [Int!]! \
} \
type Query { \
  game(gameId: Int!): Game \
  user(userId: ID!): User, \
} \
type Mutation { \
  playCard(cardId: Int!, gameId: Int!): Game \
} \
schema { \
  query: Query \
  mutation: Mutation \
} \
';

module.exports = schema;
