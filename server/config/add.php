<?php
// ============================================================
// POST /api/games/add — manually add a game
// Body (JSON): { "title": "...", "description": "...", "image_url": "..." }
// ============================================================
require_once __DIR__ . '/../config/config.php';
apply_cors_headers();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['error' => 'Method not allowed'], 405);
}

$input = json_decode(file_get_contents('php://input'), true);

if (empty($input['title'])) {
    json_response(['error' => 'Title is required'], 422);
}

$title = trim($input['title']);
$description = isset($input['description']) ? trim($input['description']) : null;
$imageUrl = isset($input['image_url']) ? trim($input['image_url']) : null;

try {
    $pdo = get_db_connection();
    $stmt = $pdo->prepare(
        "INSERT INTO games (title, description, image_url) VALUES (?, ?, ?)"
    );
    $stmt->execute([$title, $description, $imageUrl]);

    json_response([
        'message' => 'Game added',
        'game' => [
            'id' => $pdo->lastInsertId(),
            'title' => $title,
            'description' => $description,
            'image_url' => $imageUrl,
            'vote_count' => 0,
        ],
    ], 201);
} catch (PDOException $e) {
    json_response(['error' => 'Database error', 'details' => $e->getMessage()], 500);
}
