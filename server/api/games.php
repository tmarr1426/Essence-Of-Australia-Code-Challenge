<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . "/../config/cors.php";
require_once __DIR__ . "/../services/GameService.php";

header("Content-Type: application/json");


$service = new GameService();

$result = $service->getGames();

echo json_encode($result);