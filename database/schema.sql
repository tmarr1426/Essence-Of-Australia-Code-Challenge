/**
 * schema.sql (database/schema.sql)
 *
 * Database initialization script for Docker deployment.
 *
 * Responsibilities:
 * - Creates application database tables
 * - Defines relationships between tables
 * - Inserts initial seed data
 *
 * Tables:
 * - users
 * - games
 * - votes
 * - user_actions
 *
 * Notes:
 * - Automatically executed when MySQL container initializes
 * - Requires a fresh database volume to rerun
 */

-- =========================================================
-- Game Voting App — MySQL Schema
-- One vote per user, site-wide, changeable at any time
-- =========================================================

SET FOREIGN_KEY_CHECKS = 0;

-- ---------------------------------------------------------
-- Users
-- ---------------------------------------------------------

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `users` VALUES (1,'uniqueuser123','unique123@test.com','$2y$12$smsYHvelWJpLogakkwPWfeUx89aDP0um6AOyfKlRLTpjs6J5byP8i','2026-08-05 11:42:09'),(2,'test','test@gmail.com','$2y$12$ZJqEV3JNXHNnprBerZbUmOC.0wYCpZxYLc7eJJ9M3ZjRIJCahUDra','2026-08-05 11:42:29'),(3,'test2','test2@gmail.com','$2y$12$wFlidr.tfNdHNTBDYWk70uyAKVP5kWVcbG90plYuaIl0PArJybUnW','2026-08-05 12:28:39'),(4,'test3','test3@gmail.com','$2y$12$ky3VsxNTIgTSBAD7kRmti.qVMDZj0VMbJ/slhzy904WIhmVCWaGpy','2026-08-05 15:12:13'),(5,'test4','test4@gmail.com','$2y$12$AsGErSx4Ubu/cSRrZmY8juBHCODUgIPTnOGrJsDZmzBAucUS8M2f.','2026-08-05 19:00:11');

-- ---------------------------------------------------------
-- Games
-- ---------------------------------------------------------

CREATE TABLE `games` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `image_url` varchar(500) DEFAULT NULL,
  `vote_count` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_games_user` (`user_id`),
  CONSTRAINT `fk_games_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `games` VALUES (1,'Zelda',NULL,NULL,0,'2026-08-05 12:58:27','2026-08-05 12:58:27',NULL),(3,'Baldur''s Gate 3',NULL,NULL,0,'2026-08-05 13:28:23','2026-08-05 13:28:23',NULL),(4,'Mario',NULL,NULL,0,'2026-08-05 13:30:39','2026-08-05 13:30:39',NULL),(5,'Mario 2',NULL,NULL,0,'2026-08-05 13:32:54','2026-08-05 13:32:54',NULL),(6,'World of Warcraft',NULL,NULL,0,'2026-08-05 13:35:30','2026-08-05 13:35:30',NULL),(7,'League of Legends',NULL,NULL,0,'2026-08-05 13:37:39','2026-08-05 13:37:39',NULL),(8,'Something',NULL,NULL,0,'2026-08-05 13:39:34','2026-08-05 16:08:23',NULL);

-- ---------------------------------------------------------
-- Votes
-- One row per user (UNIQUE on user_id) = one vote total per person.
-- Users change their vote by UPDATE-ing game_id on their existing row.
-- ---------------------------------------------------------

CREATE TABLE `votes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `game_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_vote` (`user_id`),
  KEY `game_id` (`game_id`),
  CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `votes_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `votes` VALUES (1,3,1,'2026-08-05 14:16:50','2026-08-05 14:16:50'),(3,5,1,'2026-08-05 19:00:14','2026-08-05 19:00:14');

-- ---------------------------------------------------------
-- Triggers: keep games.vote_count automatically accurate
-- ---------------------------------------------------------

CREATE TABLE `user_actions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `action_type` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_actions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `user_actions` VALUES (1,3,'add_game','2026-08-05 13:39:34'),(2,3,'vote','2026-08-05 14:16:50'),(3,4,'vote','2026-08-05 15:20:18'),(4,5,'vote','2026-08-05 19:00:14');
