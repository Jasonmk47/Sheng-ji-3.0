const resolverMap = {
  user: async (args, context) => {
    return await context
      .one(
        "SELECT u.userId, u.username, array_agg(m.matchId) AS matches FROM account.users u LEFT JOIN game.matches m ON u.userId = ANY(m.userIds) WHERE u.userId = '" +
          args.userId +
          "' GROUP BY u.userId;",
      )
      .then(data => {
        return {
          userId: data.userid,
          username: data.username,
          matches: data.matches,
        };
      })
      .catch(err => console.error('Failed to read users', err));
  },
  currentGame: async (args, context) => {
    return await context
      .one(
        "SELECT g.gameId, m.matchId, g.isActive, g.trumpSuit, g.trumpNumber, g.startingUserId FROM game.matches m JOIN game.games g ON m.matchId = g.matchId WHERE g.isActive = TRUE AND g.matchId = '" +
          args.matchId +
          "'",
      )
      .then(data => {
        console.log(data);
        return {
          gameId: data.gameid,
          matchId: data.matchid,
          isActive: true,
          trumpSuit: data.trumpsuit,
          trumpNumber: data.trumpnumber,
          startingUserId: data.startinguserid,
          tricks: [1],
        };
      })
      .catch(err => console.error('Failed to read users', err));
  },
  playCard: (cardId, gameId) => {},
};

module.exports = resolverMap;
