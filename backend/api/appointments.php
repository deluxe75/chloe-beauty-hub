<?php
/**
 * /api/appointments.php
 * POST: Book a new beauty appointment (with input validation)
 * GET:  List all appointment bookings (admin use)
 */

require_once __DIR__ . '/../config.php';

header('Content-Type: application/json; charset=UTF-8');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // List all appointment bookings
    try {
        $stmt = $pdo->query("SELECT id, name, phone, service, preferred_date, created_at FROM appointments ORDER BY preferred_date ASC, created_at DESC");
        $appointments = $stmt->fetchAll();

        http_response_code(200);
        echo json_encode([
            'status' => 'success',
            'count' => count($appointments),
            'data' => $appointments
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => 'Failed to fetch appointments: ' . $e->getMessage()
        ]);
    }
    exit;
}

if ($method === 'POST') {
    // Read raw input payload (supports application/json as well as $_POST)
    $inputJSON = file_get_contents('php://input');
    $data = json_decode($inputJSON, true);

    if (!$data) {
        $data = $_POST;
    }

    $name = isset($data['name']) ? trim($data['name']) : '';
    $phone = isset($data['phone']) ? trim($data['phone']) : '';
    $service = isset($data['service']) ? trim($data['service']) : '';
    $preferred_date = isset($data['preferred_date']) ? trim($data['preferred_date']) : '';

    // Validation
    $errors = [];

    if (empty($name)) {
        $errors['name'] = 'Full name is required.';
    } elseif (strlen($name) < 2 || strlen($name) > 120) {
        $errors['name'] = 'Name must be between 2 and 120 characters.';
    }

    if (empty($phone)) {
        $errors['phone'] = 'Phone number is required.';
    } elseif (!preg_match('/^[0-9+\s\-()]{7,25}$/', $phone)) {
        $errors['phone'] = 'Please enter a valid phone number (e.g., +234 803 123 4567).';
    }

    if (empty($service)) {
        $errors['service'] = 'Please select a service.';
    }

    if (empty($preferred_date)) {
        $errors['preferred_date'] = 'Preferred appointment date is required.';
    } else {
        // Validate date format (YYYY-MM-DD)
        $d = DateTime::createFromFormat('Y-m-d', $preferred_date);
        if (!$d || $d->format('Y-m-d') !== $preferred_date) {
            $errors['preferred_date'] = 'Date must be formatted as YYYY-MM-DD.';
        }
    }

    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode([
            'status' => 'fail',
            'message' => 'Validation errors occurred.',
            'errors' => $errors
        ]);
        exit;
    }

    try {
        $sql = "INSERT INTO appointments (name, phone, service, preferred_date) VALUES (:name, :phone, :service, :preferred_date)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':name' => $name,
            ':phone' => $phone,
            ':service' => $service,
            ':preferred_date' => $preferred_date,
        ]);

        $bookingId = $pdo->lastInsertId();

        http_response_code(201);
        echo json_encode([
            'status' => 'success',
            'message' => 'Appointment booked successfully! Our concierge will contact you shortly.',
            'data' => [
                'id' => (int)$bookingId,
                'name' => $name,
                'phone' => $phone,
                'service' => $service,
                'preferred_date' => $preferred_date
            ]
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => 'Failed to save appointment: ' . $e->getMessage()
        ]);
    }
    exit;
}

http_response_code(405);
echo json_encode([
    'status' => 'error',
    'message' => 'Method Not Allowed. Accepted methods: GET, POST.'
]);
