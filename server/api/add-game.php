<?php

require_once __DIR__ . "/../config/cors.php";
require_once __DIR__ . "/../services/GameService.php";


header("Content-Type: application/json");


$data = json_decode(
    file_get_contents("php://input"),
    true
);


if (!isset($data["name"])) {

    http_response_code(400);

    echo json_encode([
        "error" => "Game name required"
    ]);

    exit;

}


$service = new GameService();


$result = $service->addGame(
    $data["name"]
);


echo json_encode($result);