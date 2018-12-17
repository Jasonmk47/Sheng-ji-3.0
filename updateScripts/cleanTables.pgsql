\c mylocaldb;

TRUNCATE TABLE game.matchUserInfos CASCADE;
TRUNCATE TABLE game.gameUserInfos CASCADE;
TRUNCATE TABLE game.tricks CASCADE;
TRUNCATE TABLE game.games CASCADE;
TRUNCATE TABLE game.matches CASCADE;
TRUNCATE TABLE account.users CASCADE;

DROP TABLE game.matchUserInfos CASCADE;
DROP TABLE game.gameUserInfos CASCADE;
DROP TABLE game.tricks CASCADE;
DROP TABLE game.games CASCADE;
DROP TABLE game.matches CASCADE;
DROP TABLE account.users CASCADE;

DROP SCHEMA account;
DROP SCHEMA game;