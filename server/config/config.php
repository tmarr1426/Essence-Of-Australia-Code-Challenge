<?php
// ============================================================
// config.php — DB connection (users only) + external Games API
// ============================================================
require_once __DIR__ . '/../../vendor/autoload.php'; // adjust if vendor/ lives elsewhere

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../../../'); // project root
$dotenv->load();

// ---- Database (users/auth only — games & votes now live in the external API) ----
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_NAME', getenv('DB_NAME') ?: 'game_voting_app');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') ?: '');

// ---- External Games/Votes API ----
define('GAME_API_KEY', getenv('GAME_API_KEY') ?: '');
define('GAME_API_BASE_URL', 'https://codechallenge.essensedesigns.info');

function get_db_connection(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    }
    return $pdo;
}

// ---- Shared JSON response helper ----
function json_response(array $data, int $status = 200): void {
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

// ---- Shared CORS headers ----
function apply_cors_headers(): void {
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

/**
 * Call an endpoint on the external Games/Votes API.
 *
 * @param string $path    e.g. '/games/list', '/games/vote'
 * @param array  $params  extra params beyond api_key (e.g. ['id' => 5])
 * @param string $method  'POST' or 'GET'
 * @return array          decoded JSON response
 */
function call_game_api(string $path, array $params = [], string $method = 'POST'): array {
    if (empty(GAME_API_KEY)) {
        json_response(['error' => 'GAME_API_KEY is not configured on the server'], 500);
    }

    $params['api_key'] = GAME_API_KEY;

    if ($method === 'GET') {
        $url = GAME_API_BASE_URL . $path . '?' . http_build_query($params);
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    } else {
        $url = GAME_API_BASE_URL . $path;
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode($params),
            CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        ]);
    }

    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($response === false) {
        json_response(['error' => 'Failed to reach Games API', 'details' => $curlError], 502);
    }

    $decoded = json_decode($response, true);

    if ($httpCode < 200 || $httpCode >= 300) {
        json_response(['error' => 'Games API returned an error', 'status' => $httpCode, 'body' => $decoded], 502);
    }

    return $decoded ?? [];
}