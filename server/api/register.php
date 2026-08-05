<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . "/../config/cors.php";
require_once __DIR__ . "/../services/UserService.php";

header("Content-Type: application/json");


$data = json_decode(
    file_get_contents("php://input"),
    true
);


if (
    !isset($data["username"]) ||
    !isset($data["email"]) ||
    !isset($data["password"])
) {

    http_response_code(400);

    echo json_encode([
        "error" => "Missing required fields"
    ]);

    exit;

}


try {

    $service = new UserService();


    $result = $service->register(
        $data["username"],
        $data["email"],
        $data["password"]
    );


    echo json_encode($result);


} catch (Throwable $e) {

    http_response_code(500);

    echo json_encode([
        "error" => $e->getMessage(),
        "file" => $e->getFile(),
        "line" => $e->getLine()
    ]);

}