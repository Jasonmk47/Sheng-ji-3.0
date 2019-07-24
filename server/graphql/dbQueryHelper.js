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
          , m.matchName
          , m.isActive AS matchIsActive
          , m.numPlayers
          , m.numDecks
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
        matchName: data[0].matchname,
        isActive: data[0].matchisactive,
        numPlayers: data[0].numplayers,
        numDecks: data[0].numDecks,
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

module.exports = {
  getUser,
  getGame,
  getMatch,
  getTrick,
  getMatchIdsForUserId,
  getGameIdsForUserId,
};
