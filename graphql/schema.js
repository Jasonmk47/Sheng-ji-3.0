const schema =
  ' \
type User { \
    id: ID! \
    username: String! \
} \
 \
type Match { \
    id: ID! \
    isActive: Boolean! \
    userIds: [ID] \
} \
 \
type Game { \
    id: ID! \
    matchId: Int! \
    isActive: Boolean! \
    trumpSuit: Int \
    trumpNumber: Int \
    startingUserId: ID \
} \
 \
type Tricks { \
    id: Int! \
    gameId: Int! \
    startingUserId: ID! \
    winningUserId: ID \
    playedCardIds: [Int] \
} \
 \
 type Query {\
   games: [Game]\
 }\
 \
 type Mutation {\
   playCard(cardId: Int!): Game\
 }\
 \
schema { \
  query: Query \
  mutation: Mutation \
} \
';

module.exports = schema;
