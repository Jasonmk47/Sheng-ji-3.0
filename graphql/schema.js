const schema =
  ' \
type User { \
  id: ID! \
  username: String! \
  activeMatchIds: [Int!] \
} \
 \
type Match { \
  id: ID! \
  isActive: Boolean! \
  userIds: [ID!]! \
  gameIds: [Int!]! \
} \
 \
type Game { \
  id: ID! \
  matchId: Int! \
  isActive: Boolean! \
  trumpSuit: Int \
  trumpNumber: Int \
  startingUserId: ID \
  tricks: [Tricks]! \
} \
 \
type Tricks { \
  id: Int! \
  startingUserId: ID! \
  winningUserId: ID \
  playedCardIds: [Int!]! \
} \
 \
type Query { \
  game(gameId: Int!): Game \
} \
 \
type Mutation { \
  playCard(cardId: Int!, gameId: Int!): Game \
} \
 \
schema { \
  query: Query \
  mutation: Mutation \
} \
';

module.exports = schema;
