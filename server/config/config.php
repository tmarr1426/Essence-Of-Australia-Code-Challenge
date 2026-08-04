<?php
// ============================================================
// config.php — DB connection + external API credentials
// ============================================================
// Never hardcode secrets here. Set these as actual environment
// variables on your server (e.g. in your Apache/Nginx vhost,
// a .env loaded via putenv(), or your hosting panel's env settings).
// ============================================================

// ---- Database ----
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_NAME', getenv('DB_NAME') ?: 'game_voting_app');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') ?: '');

// ---- External game data API ----
define('GAME_API_KEY', getenv('GAME_API_KEY') ?: '');
define('GAME_API_BASE_URL', getenv('GAME_API_BASE_URL') ?: ''); // e.g. https://api.example.com/v1

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

// ---- Shared CORS headers (adjust origin for production) ----
function apply_cors_headers(): void {
    header('Access-Control-Allow-Origin: http://localhost:5173'); // your Vite dev server
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}
