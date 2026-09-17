<?php
/**
 * GET /api/testimonials.php
 * Fetches verified client reviews and testimonials.
 */

require_once __DIR__ . '/../config.php';

header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Method Not Allowed. Use GET to fetch testimonials.'
    ]);
    exit;
}

try {
    $stmt = $pdo->query("SELECT id, name, location, quote, image_url FROM testimonials ORDER BY id ASC");
    $testimonials = $stmt->fetchAll();

    http_response_code(200);
    echo json_encode([
        'status' => 'success',
        'count' => count($testimonials),
        'data' => $testimonials
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to retrieve testimonials: ' . $e->getMessage()
    ]);
}
