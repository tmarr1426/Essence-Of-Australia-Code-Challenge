-- =========================================================
-- Game Voting App — MySQL Schema
-- One vote per user, site-wide, changeable at any time
-- =========================================================

CREATE DATABASE IF NOT EXISTS GameVoteApp;
USE GameVoteApp;

-- ---------------------------------------------------------
-- Users
-- ---------------------------------------------------------
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ---------------------------------------------------------
-- Games
-- ---------------------------------------------------------
CREATE TABLE games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    vote_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ---------------------------------------------------------
-- Votes
-- One row per user (UNIQUE on user_id) = one vote total per person.
-- Users change their vote by UPDATE-ing game_id on their existing row.
-- ---------------------------------------------------------
CREATE TABLE votes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    game_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (game_id)
        REFERENCES games(id)
        ON DELETE CASCADE,

    UNIQUE KEY unique_user_vote(user_id)
) ENGINE=InnoDB;

-- ---------------------------------------------------------
-- Triggers: keep games.vote_count automatically accurate
-- ---------------------------------------------------------
DELIMITER //

-- New vote cast
CREATE TRIGGER after_vote_insert
AFTER INSERT ON votes
FOR EACH ROW
BEGIN
    UPDATE games SET vote_count = vote_count + 1 WHERE id = NEW.game_id;
END//

-- Vote changed to a different game
CREATE TRIGGER after_vote_update
AFTER UPDATE ON votes
FOR EACH ROW
BEGIN
    IF OLD.game_id <> NEW.game_id THEN
        UPDATE games SET vote_count = vote_count - 1 WHERE id = OLD.game_id;
        UPDATE games SET vote_count = vote_count + 1 WHERE id = NEW.game_id;
    END IF;
END//

-- Vote removed (e.g. user deleted, or vote row deleted directly)
CREATE TRIGGER after_vote_delete
AFTER DELETE ON votes
FOR EACH ROW
BEGIN
    UPDATE games SET vote_count = vote_count - 1 WHERE id = OLD.game_id;
END//

DELIMITER ;

--create a table to track actions for the day
CREATE TABLE user_actions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    action_type ENUM('vote','add_game') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);