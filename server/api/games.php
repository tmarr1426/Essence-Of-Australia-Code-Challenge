<?php

require_once __DIR__ . "/../config/cors.php";
require_once __DIR__ . "/../services/GameService.php";

header("Content-Type: application/json");


$data = json_decode(
    file_get_contents("php://input"),
    true
);


try {

    $service = new GameService();


    $userId = $data["userId"] ?? null;


    echo json_encode([
        "games" => $service->getGames(
            $userId
        )
    ]);


} catch(Throwable $e) {

    http_response_code(500);

    echo json_encode([
        "error" => $e->getMessage()
    ]);

}