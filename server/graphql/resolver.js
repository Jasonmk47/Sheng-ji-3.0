const getUser = async (userId, context) => {
  return await context
    .one(
      `SELECT
          u.userId
          , u.username
        FROM account.users u
        WHERE u.userId = '${userId}';`,
    )
    .then(data => {
      if (data === undefined || data === null) {
        throw new Error('No data returned for user query');
      }
      return {
        userId: data.userid,
        username: data.username,
      };
    })
    .catch(err => console.error(`Failed to read user ${userId}`, err));
};

const getGame = async (gameId, userId, context) => {
  var tricks = await context
    .any(`SELECT trickId FROM game.tricks WHERE gameId = ${gameId}`)
    .then(data => {
      if (data === undefined || data === null) {
        return [];
      }
      return data;
    })
    .catch(err => console.error('Failed to read tricks from games', err));

  Promise.resolve(tricks);

  return await context
    .any(
      `SELECT
        g.gameId
        , g.matchId
        , g.isActive
        , g.trumpSuit
        , g.trumpNumber
        , g.startingUserId
        , g.bottomSettingUserId
        , g.bottomCardIds
        , gui.userId
        , gui.points
        , gui.heldCardIds
        FROM game.games g
        JOIN game.gameUserInfos gui
          ON g.gameId = gui.gameId
        WHERE g.gameId = ${gameId};`,
    )
    .then(data => {
      if (data === undefined || data === null) {
        throw new Error('No data returned for game query');
      }
      return {
        gameId: data[0].gameid,
        matchId: data[0].matchid,
        isActive: data[0].isactive,
        trumpSuit: data[0].trumpsuit,
        trumpNumber: data[0].trumpnumber,
        startingUserId: data[0].startinguserid,
        bottomSettingUserId: data[0].bottomsettinguserid,
        bottomCardIds:
          data[0].bottomsettinguserid === userId ? data[0].bottomcardids : [],
        gameInfos: data.reduce((agg, datum, i) => {
          return agg.concat({
            user: getUser(datum.userid, context),
            hand: datum.userid === userId ? datum.heldcardids : [],
            currentPoints: datum.points,
          });
        }, []),
        playedTricks: tricks.map(t => getTrick(t.trickid, context)),
      };
    })
    .catch(err => console.error('Failed to read games', err));
};

const getMatch = async (matchId, userId, context) => {
  return await context
    .any(
      `SELECT
        m.matchId
        , m.isActive AS matchIsActive
        , m.numPlayers
        , g.isActive AS gameIsActive
        , g.gameId
        , mui.level
        , mui.orderId
        , mui.userId
      FROM game.matches m
      JOIN game.games g
        ON m.matchId = g.matchId
      JOIN game.matchUserInfos mui
        ON mui.matchId = m.matchId
      WHERE m.matchId = ${matchId};`,
    )
    .then(async data => {
      if (data === undefined || data === null) {
        throw new Error('No data returned for game query');
      }

      var allGames = await Promise.all(
        data.map(async d => await getGame(d.gameid, userId, context)),
      );

      return {
        matchId: data[0].matchid,
        isActive: data[0].matchisactive,
        numPlayers: data[0].numplayers,
        currentGame: allGames.find(g => g.isActive),
        allGames: allGames,
        matchInfos: data
          .filter(d => d.gameisactive)
          .map(d => {
            return {
              userScore: d.level,
              orderId: d.orderid,
              user: getUser(d.userid, context),
            };
          }),
      };
    })
    .catch(err => console.error('Failed to read matches', err));
};

const getTrick = async (trickId, context) => {
  return await context
    .any(
      `SELECT t.trickId
        , t.gameId
        , t.startingUserId
        , t.winningUserId
        , tui.trickType
        , tui.userId
        , tui.playedCards
        FROM game.tricks t
        JOIN game.trickUserInfos tui
          ON t.trickId = tui.trickId
        WHERE t.trickId = ${trickId};`,
    )
    .then(data => {
      if (data === undefined || data === null) {
        throw new Error('No data returned for game query');
      }
      return {
        trickId: data[0].trickid,
        gameId: data[0].gameid,
        startingUserId: data[0].startinguserid,
        winningUserId: data[0].winninguserid,
        playType: data[0].tricktype,
        trickInfos: data.map(d => {
          return {
            userId: d.userid,
            playedCards: d.playedcards,
          };
        }),
      };
    })
    .catch(err => console.error(`Failed to read tricks for ${trickId}`, err));
};

const getMatchIdsForUserId = async (userId, context) => {
  return await context
    .any(
      `SELECT m.matchId
        , m.isActive
      FROM game.matches m
      JOIN game.matchUserInfos mui
        ON m.matchId = mui.matchId
      WHERE mui.userId = '${userId}'`,
    )
    .then(data => {
      if (data === undefined || data === null) {
        throw new Error('No data returned for game query');
      }
      return data.map(d => {
        return { matchId: d.matchid, isActive: d.isactive };
      });
    })
    .catch(err => console.error(`Failed to read matchIds for ${userId}`, err));
};

const getGameIdsForUserId = async (userId, context) => {
  return await context
    .any(
      `SELECT g.gameId, g.isActive
      FROM game.games g
      JOIN game.gameUserInfos gui
        ON g.gameId = gui.gameId
      WHERE gui.userId = '${userId}';`,
    )
    .then(data => {
      if (data === undefined || data === null) {
        throw new Error('No data returned for game query');
      }
      return data.map(d => {
        return { gameId: d.gameid, isActive: d.isactive };
      });
    })
    .catch(err => console.error(`Failed to read gameIds for ${userId}`, err));
};

const resolverMap = {
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
      .filter(m => m.isactive)
      .map(m => getMatch(m.matchid), context);
  },
};

module.exports = resolverMap;
