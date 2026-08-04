<?php
// ============================================================
// POST /api/games/removeVote — remove a vote from a game
// Body (JSON): { "id": 5 }
// ============================================================
require_once __DIR__ . '/../config/config.php';
apply_cors_headers();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['error' => 'Method not allowed'], 405);
}

$input = json_decode(file_get_contents('php://input'), true);
$id = $input['id'] ?? null;

if (!$id || !ctype_digit((string)$id)) {
    json_response(['error' => 'A valid numeric id is required'], 422);
}

$result = call_game_api('/games/removeVote', ['id' => (int)$id]);
json_response($result);