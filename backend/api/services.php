<?php
/**
 * GET /api/services.php
 * Fetches all available beauty and styling services.
 */

require_once __DIR__ . '/../config.php';

header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Method Not Allowed. Use GET to fetch services.'
    ]);
    exit;
}

try {
    $stmt = $pdo->query("SELECT id, title, icon, description FROM services ORDER BY id ASC");
    $services = $stmt->fetchAll();

    http_response_code(200);
    echo json_encode([
        'status' => 'success',
        'count' => count($services),
        'data' => $services
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to retrieve services: ' . $e->getMessage()
    ]);
}
