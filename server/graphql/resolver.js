const dbQueryHelper = require('./dbQueryHelper.js');
const dbMutationHelper = require('./dbMutationHelper.js');

const {
  getUser,
  getGame,
  getMatch,
  getTrick,
  getMatchIdsForUserId,
  getGameIdsForUserId,
} = dbQueryHelper;

const { createDbMatch } = dbMutationHelper;

const resolverMap = {
  //////////////////////////////////////////////////////////////////////////////////////
  // Queries ///////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  user: async (args, context) => {
    return await getUser(args.userId, context);
  },
  game: async (args, context) => {
    return await getGame(args.gameId, args.userId, context);
  },
  match: async (args, context) => {
    return await getMatch(args.matchId, args.userId, context);
  },
  trick: async (args, context) => {
    return await getTrick(args.trickId, context);
  },
  activeMatches: async (args, context) => {
    const matches = await getMatchIdsForUserId(args.userId, context);
    const activeMatchIds = matches.filter(m => m.isActive).map(m => m.matchId);

    return await activeMatchIds.map(ami => getMatch(ami, args.userId, context));
  },
  activeGames: async (args, context) => {
    // We assume if game is active then match is active
    var gameIds = await getGameIdsForUserId(args.userId, context);

    return await gameIds
      .filter(g => g.isActive)
      .map(g => getGame(g.gameId, args.userId, context));
  },
  allMatches: async (args, context) => {
    var matchIds = await getMatchIdsForUserId(args.userId, context);
    return matchIds
      .filter(m => m.isActive)
      .map(m => getMatch(m.matchId, args.userId, context));
  },

  //////////////////////////////////////////////////////////////////////////////////////
  // Mutations /////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  createMatch: async (args, context) => {
    var { userId, numPlayers, numDecks, matchName } = args;

    // Get User
    var user = await getUser(userId, context);

    // Insert new match
    var matchId = await createDbMatch(
      userId,
      numPlayers,
      numDecks,
      matchName,
      context,
    );

    if (matchId === undefined) {
      return null;
    }

    var match = {
      matchId: matchId,
      matchName: matchName,
      isActive: false,
      numPlayers: numPlayers,
      numDecks: numDecks,
      currentGame: null,
      allGames: [],
      matchInfos: [{ user: user, userScore: 2, orderId: 0 }],
    };

    return match;
  },
};

module.exports = resolverMap;
