<?php
$servername = "localhost";
$username = "root";
$password = "rio";
$database = "agriculture"; // Change to your MySQL DB name

$conn = mysqli_connect($servername, $username, $password, $database);

// Check connection
if (!$conn) {
    die("❌ Connection failed: " . mysqli_connect_error());
}
?>
