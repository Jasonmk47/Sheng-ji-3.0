import gql from 'graphql-tag';

export const CREATE_MATCH = gql`
  mutation createMatch(
    $userId: ID!
    $numPlayers: Int!
    $numDecks: Int!
    $matchName: String!
  ) {
    createMatch(
      userId: $userId
      numPlayers: $numPlayers
      numDecks: $numDecks
      matchName: $matchName
    ) {
      matchId
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password)
  }
`;
