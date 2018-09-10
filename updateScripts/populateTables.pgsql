BEGIN;

INSERT INTO account.users(userid, username, passwordHash)
VALUES ('2f1a855c-cc35-48ac-a045-562207a1a3c9', 'jason', '123');

COMMIT;