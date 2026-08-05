<!-- /**
 * Database.php (server/database/Database.php)
 *
 * Handles database connection management.
 *
 * Responsibilities:
 * - Creates PDO database connections
 * - Maintains reusable database connection instance
 * - Configures PDO error handling
 *
 * Notes:
 * - Uses singleton pattern to prevent unnecessary connections
 * - Uses PDO prepared statements throughout application
 */ -->

<?php

require_once __DIR__ . "/../config/config.php";


class Database
{

    private static ?PDO $connection = null;


    public static function connect(): PDO
    {

        if (self::$connection === null) {

            self::$connection = new PDO(
                "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME,
                DB_USER,
                DB_PASSWORD
            );


            self::$connection->setAttribute(
                PDO::ATTR_ERRMODE,
                PDO::ERRMODE_EXCEPTION
            );

        }


        return self::$connection;

    }

}