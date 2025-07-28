<?php
header("Access-Control-Allow-Origin: *");

// For debugging, it's good to keep these
ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE, POST');
header('Access-Control-Allow-Headers: Content-Type');

include_once '../config/dbconnect.php';

if($_SERVER['REQUEST_METHOD'] == 'POST' || $_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $input['id'];
    
    $stmt = $connect->prepare("DELETE FROM products WHERE id=?");
    if ($stmt) {
        $stmt->execute([$id]);
        if($stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Product deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error deleting product or product not found']);
        }
        $stmt = null;
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to prepare statement']);
    }
} else {
    echo json_encode(['error' => 'Invalid request method']);
}

$connect = null;
?>