<?php

require_once "./config/config.php";


$db = getDatabaseConnection();


echo json_encode([
    "status" => "Database connected"
]);