<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . "/../config/cors.php";
require_once __DIR__ . "/../services/GameService.php";

header("Content-Type: application/json");


$data = json_decode(
    file_get_contents("php://input"),
    true
);


if (!isset($data["id"])) {

    http_response_code(400);

    echo json_encode([
        "error" => "Game ID required"
    ]);

    exit;

}


$service = new GameService();


$result = $service->removeGame(
    (int)$data["id"]
);


echo json_encode($result);