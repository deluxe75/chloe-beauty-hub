<?php
/**
 * GET /api/products.php
 * Fetches products filtered by category (e.g. ?category=wig or ?category=product)
 * or returns all products if no category parameter is provided.
 */

require_once __DIR__ . '/../config.php';

header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Method Not Allowed. Use GET to fetch products.'
    ]);
    exit;
}

$category = isset($_GET['category']) ? trim($_GET['category']) : null;

try {
    if ($category !== null && $category !== '') {
        $stmt = $pdo->prepare("SELECT id, category, name, description, price, image_url FROM products WHERE category = :category ORDER BY id ASC");
        $stmt->execute([':category' => $category]);
    } else {
        $stmt = $pdo->query("SELECT id, category, name, description, price, image_url FROM products ORDER BY id ASC");
    }

    $products = $stmt->fetchAll();

    // Ensure price is formatted as numeric float
    foreach ($products as &$product) {
        $product['price'] = (float)$product['price'];
    }

    http_response_code(200);
    echo json_encode([
        'status' => 'success',
        'category' => $category ?: 'all',
        'count' => count($products),
        'data' => $products
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to retrieve products: ' . $e->getMessage()
    ]);
}
