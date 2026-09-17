import React, { useState } from 'react';
import { X, Code2, Database, Terminal, FileText, Check, Copy } from 'lucide-react';

export default function PhpBackendModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('endpoints');
  const [copiedKey, setCopiedKey] = useState(null);

  if (!isOpen) return null;

  const copyToClipboard = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const phpConfigCode = `<?php
/**
 * Chloe Beauty Hub - Database Configuration & PDO Helper
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$db_host = getenv('DB_HOST') ?: 'localhost';
$db_name = getenv('DB_NAME') ?: 'chloe_beauty_hub';
$db_user = getenv('DB_USER') ?: 'root';
$db_pass = getenv('DB_PASS') ?: '';
$db_port = getenv('DB_PORT') ?: '3306';

$dsn = "mysql:host={$db_host};port={$db_port};dbname={$db_name};charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $db_user, $db_pass, $options);
} catch (PDOException $e) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'message' => 'DB connection failed: ' . $e->getMessage()]);
    exit;
}`;

  const phpAppointmentsCode = `<?php
/**
 * /api/appointments.php
 * POST: Create booking (with input validation)
 * GET:  List all bookings (admin view)
 */
require_once __DIR__ . '/../config.php';
header('Content-Type: application/json; charset=UTF-8');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    try {
        $stmt = $pdo->query("SELECT * FROM appointments ORDER BY preferred_date ASC, created_at DESC");
        echo json_encode(['status' => 'success', 'data' => $stmt->fetchAll()]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
    exit;
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    $name = trim($data['name'] ?? '');
    $phone = trim($data['phone'] ?? '');
    $service = trim($data['service'] ?? '');
    $preferred_date = trim($data['preferred_date'] ?? '');

    $errors = [];
    if (empty($name)) $errors['name'] = 'Full name is required.';
    if (empty($phone)) $errors['phone'] = 'Phone number is required.';
    if (empty($service)) $errors['service'] = 'Please select a service.';
    if (empty($preferred_date)) $errors['preferred_date'] = 'Date is required.';

    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode(['status' => 'fail', 'errors' => $errors]);
        exit;
    }

    try {
        $sql = "INSERT INTO appointments (name, phone, service, preferred_date) VALUES (:name, :phone, :service, :preferred_date)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':name' => $name, ':phone' => $phone, ':service' => $service, ':preferred_date' => $preferred_date]);
        
        http_response_code(201);
        echo json_encode(['status' => 'success', 'message' => 'Appointment booked successfully!', 'id' => (int)$pdo->lastInsertId()]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
    exit;
}`;

  const sqlSchemaCode = `-- Chloe Beauty Hub Database Schema
CREATE DATABASE IF NOT EXISTS \`chloe_beauty_hub\` CHARACTER SET utf8mb4;
USE \`chloe_beauty_hub\`;

CREATE TABLE \`services\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`title\` VARCHAR(100) NOT NULL,
  \`icon\` VARCHAR(50) NOT NULL,
  \`description\` TEXT NOT NULL
);

CREATE TABLE \`products\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`category\` ENUM('wig', 'product') NOT NULL,
  \`name\` VARCHAR(150) NOT NULL,
  \`description\` TEXT NOT NULL,
  \`price\` DECIMAL(10,2) NOT NULL,
  \`image_url\` VARCHAR(500) NOT NULL
);

CREATE TABLE \`testimonials\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`name\` VARCHAR(100) NOT NULL,
  \`location\` VARCHAR(100) NOT NULL,
  \`quote\` TEXT NOT NULL,
  \`image_url\` VARCHAR(500) NOT NULL
);

CREATE TABLE \`appointments\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`name\` VARCHAR(120) NOT NULL,
  \`phone\` VARCHAR(30) NOT NULL,
  \`service\` VARCHAR(100) NOT NULL,
  \`preferred_date\` DATE NOT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

  return (
    <div
      id="backend-modal-overlay"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="backend-modal-content"
        className="bg-[#1E191B] text-neutral-100 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative border border-neutral-800 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-neutral-800 shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#9B2242]/20 border border-[#9B2242]/40 text-pink-300 text-[11px] font-bold uppercase tracking-wider mb-2">
              <Code2 className="w-3.5 h-3.5" />
              <span>Full PHP + MySQL Backend Files</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">
              PHP Backend Architecture &amp; Setup Guide
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Located in <code className="font-mono text-pink-400 bg-neutral-900 px-1.5 py-0.5 rounded">/backend</code> directory with PDO prepared statements &amp; CORS.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 py-3 border-b border-neutral-800 overflow-x-auto shrink-0">
          {[
            { id: 'endpoints', label: 'API Endpoints' },
            { id: 'config', label: 'config.php' },
            { id: 'appointments', label: 'appointments.php' },
            { id: 'sql', label: 'database.sql' },
            { id: 'run', label: 'How to Run' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#9B2242] text-white'
                  : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto flex-grow py-4">
          {activeTab === 'endpoints' && (
            <div className="space-y-4">
              <p className="text-xs text-neutral-300">
                All endpoints output standard JSON responses with appropriate HTTP status codes (200, 201, 400, 405, 500) and CORS headers.
              </p>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { method: 'GET', path: '/api/services.php', desc: 'Lists 4 beauty services (Luxury Wigs, Hair Treatment, Manicure, Pedicure)' },
                  { method: 'GET', path: '/api/products.php?category=wig', desc: 'Lists wig collection (Bone Straight ₦120k, Curly ₦95k, Frontal ₦140k)' },
                  { method: 'GET', path: '/api/products.php?category=product', desc: 'Lists 6 beauty care products (Ghana Cream, Hair Oil, Serum, Edge Control...)' },
                  { method: 'GET', path: '/api/testimonials.php', desc: 'Lists 3 customer reviews with name, location, and quote' },
                  { method: 'POST', path: '/api/appointments.php', desc: 'Creates new appointment with validation (name, phone, service, date)' },
                  { method: 'GET', path: '/api/appointments.php', desc: 'Admin view of all booked appointments' },
                ].map((ep, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded font-mono text-[11px] font-bold ${
                        ep.method === 'POST' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}>
                        {ep.method}
                      </span>
                      <code className="text-xs font-mono text-pink-300">{ep.path}</code>
                    </div>
                    <span className="text-xs text-neutral-400">{ep.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'config' && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-neutral-400 font-mono">/backend/config.php</span>
                <button
                  onClick={() => copyToClipboard('config', phpConfigCode)}
                  className="text-xs flex items-center gap-1 text-pink-400 hover:text-pink-300"
                >
                  {copiedKey === 'config' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'config' ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-200 overflow-x-auto">
                <code>{phpConfigCode}</code>
              </pre>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-neutral-400 font-mono">/backend/api/appointments.php</span>
                <button
                  onClick={() => copyToClipboard('appointments', phpAppointmentsCode)}
                  className="text-xs flex items-center gap-1 text-pink-400 hover:text-pink-300"
                >
                  {copiedKey === 'appointments' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'appointments' ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-200 overflow-x-auto">
                <code>{phpAppointmentsCode}</code>
              </pre>
            </div>
          )}

          {activeTab === 'sql' && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-neutral-400 font-mono">/backend/database.sql</span>
                <button
                  onClick={() => copyToClipboard('sql', sqlSchemaCode)}
                  className="text-xs flex items-center gap-1 text-pink-400 hover:text-pink-300"
                >
                  {copiedKey === 'sql' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'sql' ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-200 overflow-x-auto">
                <code>{sqlSchemaCode}</code>
              </pre>
            </div>
          )}

          {activeTab === 'run' && (
            <div className="space-y-4 text-xs text-neutral-300 leading-relaxed">
              <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
                <h4 className="font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-pink-400" />
                  1. Local Testing with PHP Built-in Server
                </h4>
                <p>Run PHP directly from the backend folder:</p>
                <code className="block p-3 rounded-xl bg-black/60 font-mono text-pink-300">
                  php -S localhost:8000 -t backend
                </code>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
                <h4 className="font-bold text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-amber-400" />
                  2. MySQL Database Setup
                </h4>
                <p>Create the database and import table schemas &amp; seed data:</p>
                <code className="block p-3 rounded-xl bg-black/60 font-mono text-amber-300">
                  mysql -u root -p &lt; backend/database.sql
                </code>
                <p>Then configure your DB credentials in <code>backend/config.php</code>.</p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
                <h4 className="font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  3. Production / Shared Hosting (cPanel, XAMPP, Apache)
                </h4>
                <p>
                  Copy the <code>backend/</code> folder into your web root (or <code>public_html/api/</code>), import <code>database.sql</code> via phpMyAdmin, and set <code>VITE_API_BASE_URL</code> in React.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-neutral-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
