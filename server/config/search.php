<?php
// ============================================================
// GET /api/games/search?id=5 — find a single game by ID
// ============================================================
require_once __DIR__ . '/../config/config.php';
apply_cors_headers();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    json_response(['error' => 'Method not allowed'], 405);
}

$id = $_GET['id'] ?? null;

if (!$id || !ctype_digit((string)$id)) {
    json_response(['error' => 'A valid numeric id is required'], 422);
}

$result = call_game_api('/games/search', ['id' => (int)$id]);
json_response($result);