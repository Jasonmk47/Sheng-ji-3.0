\c mylocaldb;

BEGIN;

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SCHEMA IF NOT EXISTS game;
CREATE SCHEMA IF NOT EXISTS account;

CREATE TABLE IF NOT EXISTS account.users (
    userId UUID NOT NULL,
    username VARCHAR(64) NOT NULL,
    passwordHash CHAR(64) NOT NULL, --Can change char size given hash function
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (userId)
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON account.users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TABLE IF NOT EXISTS game.matches (
    matchId INT GENERATED ALWAYS AS IDENTITY,
    matchName VARCHAR(64) NOT NULL,
    isActive BOOL NOT NULL,
    numPlayers INT NOT NULL,
    numDecks INT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (matchId)
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON game.matches
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TABLE IF NOT EXISTS game.games (
    gameId INT NOT NULL,
    matchId INT NOT NULL,
    isActive BOOL NOT NULL,
    trumpSuit INT NULL, --This is an enum in client
    trumpNumber INT NOT NULL,
    startingUserId UUID NULL,
    bottomSettingUserId UUID NULL,
    bottomCardIds INT[] NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (gameId),
    FOREIGN KEY (matchId) REFERENCES game.matches (matchId) ON DELETE RESTRICT
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON game.games
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TABLE IF NOT EXISTS game.tricks (
    trickId INT NOT NULL,
    gameId INT NOT NULL,
    startingUserId UUID NOT NULL,
    winningUserId UUID NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (trickId),
    FOREIGN KEY (gameId) REFERENCES game.games (gameId) ON DELETE RESTRICT,
    FOREIGN KEY (startingUserId) REFERENCES account.users (userId) ON DELETE RESTRICT,
    FOREIGN KEY (winningUserId) REFERENCES account.users (userId) ON DELETE RESTRICT
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON game.tricks
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TABLE IF NOT EXISTS game.gameUserInfos (
    gameId INT NOT NULL,
    userId UUID NOT NULL,
    heldCardIds INT[] NOT NULL,
    points INT NOT NULL,
    PRIMARY KEY (userId, gameId),
    FOREIGN KEY (gameId) REFERENCES game.games (gameId) ON DELETE RESTRICT,
    FOREIGN KEY (userId) REFERENCES account.users (userId) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS game.matchUserInfos (
    userId UUID NOT NULL,
    matchId INT NOT NULL,
    orderId INT NOT NULL,
    level INT NOT NULL,
    PRIMARY KEY (userId, matchId),
    FOREIGN KEY (matchId) REFERENCES game.matches (matchId) ON DELETE RESTRICT,
    FOREIGN KEY (userId) REFERENCES account.users (userId) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS game.trickTypes (
    id INT NOT NULL,
    name VARCHAR(64) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS game.trickUserInfos (
    trickId INT NOT NULL,
    userId UUID NOT NULL,
    playedCards INT[] NULL,
    trickType INT NOT NULL,
    PRIMARY KEY (trickId, userId),
    FOREIGN KEY (trickId) REFERENCES game.tricks (trickId) ON DELETE RESTRICT,
    FOREIGN KEY (userId) REFERENCES account.users (userId) ON DELETE RESTRICT,
    FOREIGN KEY (trickType) REFERENCES game.trickTypes (id) ON DELETE RESTRICT
);

COMMIT;
