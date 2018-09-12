BEGIN;

CREATE SCHEMA game;
CREATE SCHEMA account;

CREATE TABLE account.users (
    userId UUID NOT NULL,
    username VARCHAR(64) NOT NULL,
    passwordHash CHAR(64) NOT NULL, --Can change char size given hash function
    PRIMARY KEY (userId)
);

CREATE TABLE game.matches (
    matchId INT NOT NULL,
    isActive BOOL NOT NULL,
    userIds UUID[] NULL, -- TODO: Can these have foreign keys?
    PRIMARY KEY (matchId)
);

CREATE TABLE game.games (
    gameId INT NOT NULL,
    matchId INT NOT NULL,
    isActive BOOL NOT NULL,
    trumpSuit INT NULL, --This is an enum in code
    trumpNumber INT NOT NULL,
    startingUserId UUID NULL,
    PRIMARY KEY (gameId),
    FOREIGN KEY (matchId) REFERENCES game.matches (matchId) ON DELETE RESTRICT
);

CREATE TABLE game.tricks (
    trickId INT NOT NULL,
    gameId INT NOT NULL,
    startingUserId UUID NOT NULL,
    winningUserId UUID NULL,
    playedCardIds INT[] NOT NULL,
    PRIMARY KEY (trickId),
    FOREIGN KEY (gameId) REFERENCES game.games (gameId) ON DELETE RESTRICT,
    FOREIGN KEY (startingUserId) REFERENCES account.users (userId) ON DELETE RESTRICT,
    FOREIGN KEY (winningUserId) REFERENCES account.users (userId) ON DELETE RESTRICT
);

CREATE TABLE game.gameUserInfos (
    gameId INT NOT NULL,
    userId UUID NOT NULL,
    heldCardIds INT[] NOT NULL,
    points INT NOT NULL,
    PRIMARY KEY (userId, gameId),
    FOREIGN KEY (gameId) REFERENCES game.games (gameId) ON DELETE RESTRICT,
    FOREIGN KEY (userId) REFERENCES account.users (userId) ON DELETE RESTRICT
);

CREATE TABLE game.matchUserInfos (
    userId UUID NOT NULL,
    matchId INT NOT NULL,
    level INT NOT NULL,
    PRIMARY KEY (userId, matchId),
    FOREIGN KEY (matchId) REFERENCES game.matches (matchId) ON DELETE RESTRICT,
    FOREIGN KEY (userId) REFERENCES account.users (userId) ON DELETE RESTRICT
);

-----------------------------------------------

-- INSERT INTO account.users (
--     userid,
--     username,
--     passwordHash
-- )
-- VALUES ('c9ed1627-cf1d-40ed-9c59-668f91c2789c', 'jason', 'salted and hashed password');

-- SELECT * FROM account.users;

-- INSERT INTO game.matches (
--     matchid,
--     isActive,
--     userIds
-- )
-- VALUES (5, true, '{"c9ed1627-cf1d-40ed-9c59-668f91c2789c"}');

-- SELECT * FROM game.matches;

-- INSERT INTO game.games (
--     gameid,
--     matchId,
--     isActive,
--     trumpSuit,
--     trumpNumber,
--     startingUserId
-- )
-- VALUES (1, 5, true, 3, 4, 'c9ed1627-cf1d-40ed-9c59-668f91c2789c');

-- SELECT * FROM game.games;

-- INSERT INTO game.tricks (
--     trickid,
--     gameID,
--     startingUserId,
--     playedCardIds
-- )
-- VALUES(20, 1, 'c9ed1627-cf1d-40ed-9c59-668f91c2789c', '{1,2,3,4}');

-- SELECT * FROM game.tricks;

-- INSERT INTO game.gameUserInfos (
--     gameId,
--     userId,
--     heldCardIds,
--     points
-- ) VALUES (1, 'c9ed1627-cf1d-40ed-9c59-668f91c2789c', '{5,6,7,8}', 40);

-- SELECT * FROM game.gameUserInfos;

-- INSERT INTO game.matchUserInfos (
--     userId,
--     matchId,
--     level
-- ) VALUES ('c9ed1627-cf1d-40ed-9c59-668f91c2789c', 5, 11);

-- SELECT * FROM game.matchUserInfos

COMMIT;