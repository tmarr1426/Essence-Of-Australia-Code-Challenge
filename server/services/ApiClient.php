<?php

require_once __DIR__ . "/../config/config.php";

class ApiClient
{
    public function post(string $endpoint, array $data = [])
{
    $url = API_BASE_URL . $endpoint;

    // Automatically add the API key
    $data["api_key"] = API_KEY;

    $curl = curl_init($url);

    curl_setopt_array($curl, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => [
    "Content-Type: application/x-www-form-urlencoded"
],
CURLOPT_POSTFIELDS => http_build_query($data)
    ]);

    $response = curl_exec($curl);

    if ($response === false) {
    throw new Exception(curl_error($curl));
}

    $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

if ($status >= 400) {
    throw new Exception("API returned HTTP {$status}: {$response}");
}

return json_decode($response, true);
}
}