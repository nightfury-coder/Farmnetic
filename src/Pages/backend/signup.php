<?php
// Allow requests from any origin and set response type
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Database connection
$servername = "localhost";
$dbUsername = "root";
$dbPassword = "rio"; // replace with your actual DB password
$database = "farmnetic"; // your actual DB name

// Create connection
$conn = new mysqli($servername, $dbUsername, $dbPassword, $database);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Database connection failed']));
}

// Get JSON POST data
$data = json_decode(file_get_contents("php://input"), true);

// Basic validation
if (!isset($data['username']) || !isset($data['password'])) {
    echo json_encode(['status' => 'error', 'message' => 'Username and password required']);
    exit();
}

$username = $conn->real_escape_string($data['username']);
$password = $data['password'];

// Check if user already exists
$stmt = $conn->prepare("SELECT * FROM login WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['status' => 'error', 'message' => 'Username already exists']);
    exit();
}

// Hash the password before storing
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Insert user into database
$insert = $conn->prepare("INSERT INTO login (username, password) VALUES (?, ?)");
$insert->bind_param("ss", $username, $hashedPassword);

if ($insert->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'User registered successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Registration failed']);
}

// Close connections
$stmt->close();
$insert->close();
$conn->close();
?>
