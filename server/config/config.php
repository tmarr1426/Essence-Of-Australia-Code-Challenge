<?php

define("API_BASE_URL", "https://codechallenge.essensedesigns.info");
define("API_KEY", "126d42690aa6d0589c73b5200d809b99");

define("DB_HOST", "mysql");
define("DB_NAME", "gamevoteapp");
define("DB_USER", "appuser");
define("DB_PASSWORD", "password");


function getDatabaseConnection()
{

    try {

        $pdo = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME,
            DB_USER,
            DB_PASSWORD
        );


        $pdo->setAttribute(
            PDO::ATTR_ERRMODE,
            PDO::ERRMODE_EXCEPTION
        );


        return $pdo;


    } catch(PDOException $e) {

        die(
            json_encode([
                "error" => $e->getMessage()
            ])
        );

    }

}