const createDbMatchInfos = async (userId, matchId, context) => {
  await context
    .none(
      `INSERT INTO game.matchUserInfos (
            userId,
            matchId,
            orderId,
            level)
        VALUES ('${userId}', ${matchId}, 0, 2);`,
    )
    .catch(err => {
      console.error(`Failed to create match infos`, err);
      return false;
    });

  return true;
};

// Returns inserted match id
const createDbMatch = async (
  userId,
  numPlayers,
  numDecks,
  matchName,
  context,
) => {
  var matchId = await context
    .one(
      ` INSERT INTO game.matches (matchName, isActive, numPlayers, numDecks)
        VALUES ('${matchName}', FALSE, ${numPlayers}, ${numDecks})
        RETURNING matchId; 
        `,
    )
    .then(data => {
      if (data === undefined || data === null) {
        throw new Error('No data returned for create match query');
      }
      return data.matchid;
    })
    .catch(err => {
      console.error(`Failed to create match from user: ${userId}`, err);
      return;
    });

  if (!(await createDbMatchInfos(userId, matchId, context))) {
    return;
  }

  return matchId;
};

const createUser = async (username, password) => {
  // Check if already a username registered
  // Generate salt
  // Generate userId
  // Salt and hash password
  //Insert new user
  // Return new userId
  return 'new Test User Id' + username + password;
};

module.exports = { createDbMatch, createDbMatchInfos, createUser };
