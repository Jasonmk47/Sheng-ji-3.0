import gql from 'graphql-tag';

export const GET_USER = gql`
  query($userId: ID!) {
    user(userId: $userId) {
      userId
      username
    }
  }
`;

export const GET_GAME = gql`
  query($gameId: number, $userId: ID!) {
    game(gameId: $gameId, userId: $userId) {
      gameId
      matchId
      isActive
      trumpSuit
      trumpNumber
      startingUserId
      bottomSettingUserId
      bottomCardIds
      gameInfos {
        user {
          userId
          username
        }
        currentPoints
        hand
      }
      playedTricks {
        trickId
        gameId
        orderId
        startingUserId
        winningUserId
        playType
        trickInfos {
          userId
          playedCards
        }
      }
    }
  }
`;

export const GET_MATCH = gql`
  query($matchId: number, $userId: ID!) {
    match(matchId: $matchId, userId: $userId) {
      matchId
      matchName
      isActive
      numPlayers
      currentGame {
        gameId
      }
      allGames {
        gameId
      }
      matchInfos {
        user {
          userId
          username
        }
        userScore
        orderId
      }
    }
  }
`;

export const GET_ACTIVE_MATCHES = gql`
  query($userId: ID!) {
    activeMatches(userId: $userId) {
      matchId
      matchName
      isActive
      numPlayers
      currentGame {
        gameId
      }
      allGames {
        gameId
        isActive
      }
      matchInfos {
        user {
          userId
        }
        userScore
        orderId
      }
    }
  }
`;

export const GET_ACTIVE_GAMES = gql`
  query($userId: ID!) {
    activeGames(userId: $userId) {
      gameId
      matchId
      isActive
      trumpSuit
      trumpNumber
      startingUserId
      bottomSettingUserId
      bottomCardIds
      gameInfos {
        user {
          userId
          username
        }
        currentPoints
        hand
      }
    }
  }
`;

export const GET_TRICK = gql`
  query($userId: ID!) {
    trick(trickId: 1) {
      trickId
      gameId
      startingUserId
      winningUserId
      playType
      trickInfos {
        userId
        playedCards
      }
    }
  }
`;

export const GET_ALL_MATCHES = gql`
  query($userId: ID!) {
    allMatches(userId: $userId) {
      matchId
      matchName
      isActive
      numPlayers
      currentGame {
        gameId
      }
      allGames {
        gameId
        isActive
      }
      matchInfos {
        user {
          userId
          username
        }
        userScore
        orderId
      }
    }
  }
`;
