const resolverMap = {
  allUsers: async (args, context) => {
    return await context
      .any(
        'SELECT u.userId, u.username FROM account.users u GROUP BY u.userId;',
      )
      .then(data => {
        return Object.keys(data).map(function(key) {
          data[key]['userId'] = data[key]['userid'];
          delete data[key]['userid'];
          return data[key];
        });
      })
      .catch(err => console.error('Failed to read all users', err));
  },

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
  activeGame: async (args, context) => {
    return await context
      .one(
        'SELECT g.gameId, m.matchId, g.isActive, g.trumpSuit, g.trumpNumber, g.startingUserId, gui.heldCardIds AS hand, gui.points FROM game.matches m JOIN account.users u ON u.userId = ANY(m.userIds) JOIN game.games g ON m.matchId = g.matchId JOIN game.gameUserInfos gui ON gui.gameId = g.gameId WHERE g.isActive = TRUE AND m.isActive = TRUE AND g.matchId = ' +
          args.matchId +
          " AND gui.userId = '" +
          args.userId +
          "' AND u.userId = '" +
          args.userId +
          "'",
      )
      .then(data => {
        return {
          gameId: data.gameid,
          matchId: data.matchid,
          isActive: true,
          trumpSuit: data.trumpsuit,
          trumpNumber: data.trumpnumber,
          startingUserId: data.startinguserid,
          hand: data.hand,
          currentPoints: data.points,
        };
      })
      .catch(err => console.error('Failed to read users', err));
  },
};

module.exports = resolverMap;
