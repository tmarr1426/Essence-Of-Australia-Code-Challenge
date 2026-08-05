<?php

require_once __DIR__ . "/../config/cors.php";
require_once __DIR__ . "/../services/GameService.php";

header("Content-Type: application/json");


$data = json_decode(
    file_get_contents("php://input"),
    true
);


if (!isset($data["gameId"])) {

    http_response_code(400);

    echo json_encode([
        "error" => "Game ID required"
    ]);

    exit;

}

if (!isset($data["userId"])) {

    http_response_code(400);

    echo json_encode([
        "error" => "User ID required"
    ]);

    exit;

}


try {

    $service = new GameService();


    $result = $service->vote(
        $data["gameId"],
        $data["userId"]
    );


    echo json_encode($result);


} catch (Throwable $e) {

    http_response_code(500);

    echo json_encode([
        "error" => $e->getMessage()
    ]);

}