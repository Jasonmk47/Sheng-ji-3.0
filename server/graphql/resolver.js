const getUser = async (userId, context) => {
  return await context
    .one(
      `SELECT u.userId, u.username
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

const getGame = async (gameId, context) => {
  return await context
    .any(
      `SELECT g.gameId, m.matchId, g.isActive, g.trumpSuit, g.trumpNumber, g.startingUserId, g.bottomSettingUserId, g.bottomCardIds, gui.userId, gui.points, gui.heldCardIds
        FROM game.games g
        JOIN game.matches m
        ON g.matchId = m.matchId
        JOIN game.gameUserInfos gui
        ON g.gameId = gui.gameId
        WHERE g.gameId = ${gameId}
      `,
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
        bottomCardIds: data[0].bottomcardids,
        gameInfos: data.reduce((agg, datum, i) => {
          return agg.concat({
            user: getUser(datum.userid, context),
            hand: datum.heldcardids,
            currentPoints: datum.points,
          });
        }, []),
        playedTricks: [],
      };
    })
    .catch(err => console.error('Failed to read games', err));
};

const getMatch = async (matchId, context) => {
  return await context
    .any(
      `SELECT m.matchId, m.isActive, m.numPlayers, g.isActive, g.gameId, mui.level, mui.orderId, mui.userId
      FROM game.matches m
      JOIN game.games g
        ON m.matchId = g.matchId
      JOIN game.matchUserInfos mui
        ON mui.matchId = m.matchId
      WHERE m.matchId = ${matchId}`,
    )
    .then(data => {
      if (data === undefined || data === null) {
        throw new Error('No data returned for game query');
      }
      return {
        matchId: data[0].matchid,
        isActive: data[0].isactive,
        numPlayers: data[0].numplayers,
        currentGame: getGame(data.find(d => d.isactive).gameid, context),
        allGames: data.map(d => getGame(d.gameid, context)),
        matchInfos: data.map(d => {
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

const getMatchIdsForUserId = async (userId, context) => {
  return await context.any(
    `SELECT m.matchId, m.isActive
    FROM game.matches m
    JOIN game.matchUserInfos mui
      ON m.matchId = mui.matchId
    WHERE mui.userId = ${userId}
    `,
  );
};

const resolverMap = {
  user: async (args, context) => {
    return await getUser(args.userId, context);
  },
  game: async (args, context) => {
    return await getGame(args.gameId, context);
  },
  match: async (args, context) => {
    return await getMatch(args.matchId, context);
  },
  activeMatches: async (args, context) => {
    const matches = getMatchIdsForUserId(args.userId, context);
    const activeMatchIds = matches.filter(m => m.isActive).map(m => m.matchId);

    return await activeMatchIds.map(ami => getMatch(ami));
  },
  activeGame: async (args, context) => {
    return await context
      .one(
        `SELECT g.gameId, m.matchId, g.isActive, g.trumpSuit, g.trumpNumber, g.startingUserId, gui.heldCardIds AS hand, gui.points 
        FROM game.matches m
        LEFT JOIN game.matchUserInfos mui
          ON mui.matchId = mui.matchId
        LEFT JOIN account.users u
          ON u.userId = mui.userId
        JOIN game.games g
          ON m.matchId = g.matchId
        JOIN game.gameUserInfos gui
          ON gui.gameId = g.gameId
        WHERE g.isActive = TRUE
          AND m.isActive = TRUE
          AND g.matchId = ${args.matchId}
          AND gui.userId = '${args.userId}'
          AND u.userId = '${args.userId}';`,
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
      .catch(err =>
        console.error(
          `Failed to read active game ${(args.matchId, args.userId)}`,
          err,
        ),
      );
  },
  allGames: async (args, context) => {
    return await context
      .any(
        `SELECT g.gameId, MIN(g.matchId), BOOL_OR(g.isActive), MIN(g.trumpSuit), MIN(g.trumpNumber), g.startingUserId
        FROM game.games g
        JOIN game.gameUserInfos gui
          ON g.gameId = gui.gameId
        GROUP BY g,gameId, g.startingUserId`, // Add to groupby since starting no agg functions for UUID
      )
      .then(data => {
        var userData = data.filter(d => d.userId === args.userId);
        console.log(data);
        return userData.map(game => {
          return {
            gameId: game.gameid,
            matchId: game.matchid,
            isActive: game.isactive,
            trumpSuit: game.trumpsuit,
            trumpNumber: game.trumpnumber,
            startingUserId: game.startinguserid,
            bottomSettingUserId: game.bottomsettinguserid,
            bottomCardIds: game.bottomcardids,
            gameInfos: [
              {
                user: getUser(game.userid, context),
                currentPoints: game.points,
                hand: game.heldcardids,
              },
            ],
            playedTricks: [],
          };
        });
      });
  },
};

module.exports = resolverMap;
