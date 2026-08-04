<?php
// ============================================================
// GET /api/games — list all games, ordered by votes desc
// ============================================================
require_once __DIR__ . '/../config/config.php';
apply_cors_headers();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    json_response(['error' => 'Method not allowed'], 405);
}

try {
    $pdo = get_db_connection();
    $stmt = $pdo->query(
        "SELECT id, title, description, image_url, vote_count, created_at
         FROM games
         ORDER BY vote_count DESC, title ASC"
    );
    $games = $stmt->fetchAll();

    json_response(['games' => $games]);
} catch (PDOException $e) {
    json_response(['error' => 'Database error', 'details' => $e->getMessage()], 500);
}
