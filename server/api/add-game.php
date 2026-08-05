<?php

require_once __DIR__ . "/../config/cors.php";
require_once __DIR__ . "/../services/GameService.php";

header("Content-Type: application/json");


$data = json_decode(
    file_get_contents("php://input"),
    true
);


if (
    !isset($data["name"]) ||
    !isset($data["user_id"])
) {

    http_response_code(400);

    echo json_encode([
        "error" => "Game name and user required"
    ]);

    exit;

}


try {

    $service = new GameService();


    $result = $service->addGame(
        $data["name"],
        $data["user_id"]
    );


    echo json_encode($result);


} catch (Exception $e) {

    http_response_code(400);

    echo json_encode([
        "error" => $e->getMessage()
    ]);

}