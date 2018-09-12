const resolverMap = {
  user: async (args, context) => {
    return await context
      .one("SELECT * FROM account.users WHERE userId = '" + args.userId + "';")
      .then(data => {
        return {
          userId: data.userid,
          username: data.username,
          activeMatchIds: [1],
        };
      })
      .catch(err => console.error('Failed to read users', err));
  },
  playCard: (cardId, gameId) => {},
  User: {},
  Match: {},
  Game: {},
  Tricks: {},
};

module.exports = resolverMap;
