BEGIN;

\c mylocaldb;

INSERT INTO account.users(userid, username, passwordHash)
VALUES ('2f1a855c-cc35-48ac-a045-562207a1a3c9', 'jason', '123');

INSERT INTO account.users (
    userid,
    username,
    passwordHash
)
VALUES ('c9ed1627-cf1d-40ed-9c59-668f91c2789c', 'jason', 'salted and hashed password');

SELECT * FROM account.users;

INSERT INTO game.matches (
    matchid,
    isActive,
    userIds
)
VALUES (6, true, '{"c9ed1627-cf1d-40ed-9c59-668f91c2789c"}');

SELECT * FROM game.matches;

INSERT INTO game.games (
    gameid,
    matchId,
    isActive,
    trumpSuit,
    trumpNumber,
    startingUserId
)
VALUES (1, 5, true, 3, 4, 'c9ed1627-cf1d-40ed-9c59-668f91c2789c');

SELECT * FROM game.games;

INSERT INTO game.tricks (
    trickid,
    gameID,
    startingUserId,
    playedCardIds
)
VALUES(20, 1, 'c9ed1627-cf1d-40ed-9c59-668f91c2789c', '{1,2,3,4}');

SELECT * FROM game.tricks;

INSERT INTO game.gameUserInfos (
    gameId,
    userId,
    heldCardIds,
    points
) VALUES (1, 'c9ed1627-cf1d-40ed-9c59-668f91c2789c', '{5,6,7,8}', 40);

SELECT * FROM game.gameUserInfos;

INSERT INTO game.matchUserInfos (
    userId,
    matchId,
    level
) VALUES ('c9ed1627-cf1d-40ed-9c59-668f91c2789c', 5, 11);

SELECT * FROM game.matchUserInfos

COMMIT;
