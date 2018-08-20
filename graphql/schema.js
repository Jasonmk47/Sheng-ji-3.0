const schema =
  ' \
#Declaring here and copying over to schema.js becuase in string form it needs to be escaped in ES5... \
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
# the schema allows the following query: \
type Query { \
  posts: [Post] \
} \
 \
# this schema allows the following mutation: \
type Mutation { \
  upvotePost ( \
    postId: ID! \
  ): Post \
} \
 \
schema { \
  query: Query \
  mutation: Mutation \
} \
';

module.exports = schema;
