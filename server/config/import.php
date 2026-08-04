<?php
// ============================================================
// POST /api/games/import — fetch a game from the external API
// and insert it into our local `games` table.
//
// Body (JSON): { "query": "search term" }  OR  { "external_id": "..." }
//
// ⚠️ ADAPT ME: the request URL/headers and the response field
// mapping below are placeholders. Update the marked sections
// once you confirm the exact API you're using.
// ============================================================
require_once __DIR__ . '/../config/config.php';
apply_cors_headers();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['error' => 'Method not allowed'], 405);
}

if (empty(GAME_API_KEY) || empty(GAME_API_BASE_URL)) {
    json_response(['error' => 'External game API is not configured'], 500);
}

$input = json_decode(file_get_contents('php://input'), true);
$query = trim($input['query'] ?? '');

if ($query === '') {
    json_response(['error' => 'query is required'], 422);
}

// ------------------------------------------------------------
// 1. Call the external API
// ------------------------------------------------------------
// ⚠️ ADAPT ME: swap the endpoint path, query param name, and
// auth method (header vs query param) to match your provider.
$url = GAME_API_BASE_URL . '/games?search=' . urlencode($query);

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        // Common patterns — keep whichever matches your provider,
        // delete the other:
        'Authorization: Bearer ' . GAME_API_KEY,
        // 'x-api-key: ' . GAME_API_KEY,
    ],
    CURLOPT_TIMEOUT => 10,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($response === false) {
    json_response(['error' => 'Failed to reach external API', 'details' => $curlError], 502);
}

if ($httpCode < 200 || $httpCode >= 300) {
    json_response(['error' => 'External API returned an error', 'status' => $httpCode, 'body' => $response], 502);
}

$data = json_decode($response, true);

// ------------------------------------------------------------
// 2. Map the external response to our `games` columns
// ------------------------------------------------------------
// ⚠️ ADAPT ME: replace these keys with the real field names
// from your provider's response (e.g. $data['results'][0]['name']).
$firstResult = $data['results'][0] ?? $data[0] ?? null;

if (!$firstResult) {
    json_response(['error' => 'No results found for that query'], 404);
}

$title = $firstResult['title'] ?? $firstResult['name'] ?? null;
$description = $firstResult['description'] ?? $firstResult['summary'] ?? null;
$imageUrl = $firstResult['image_url'] ?? $firstResult['cover_url'] ?? null;

if (!$title) {
    json_response(['error' => 'Could not map external response to a game', 'raw' => $firstResult], 500);
}

// ------------------------------------------------------------
// 3. Save it locally
// ------------------------------------------------------------
try {
    $pdo = get_db_connection();
    $stmt = $pdo->prepare(
        "INSERT INTO games (title, description, image_url) VALUES (?, ?, ?)"
    );
    $stmt->execute([$title, $description, $imageUrl]);

    json_response([
        'message' => 'Game imported',
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
