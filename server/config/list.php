<?php
// ============================================================
// GET /api/games/list — list all games (with vote counts)
// ============================================================
require_once __DIR__ . '/../config/config.php';
apply_cors_headers();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    json_response(['error' => 'Method not allowed'], 405);
}

$result = call_game_api('/games/list', [], 'POST');
json_response($result);