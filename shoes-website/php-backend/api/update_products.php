<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT, POST');
header('Access-Control-Allow-Headers: Content-Type');

include_once '../config/dbconnect.php';

if($_SERVER['REQUEST_METHOD'] == 'POST' || $_SERVER['REQUEST_METHOD'] == 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $id = $input['id'];
    $name = $input['name'];
    $description = $input['description'];
    $price = $input['price'];
    $label = $input['label'];
    $stock = $input['stock'];
    
    $stmt = $connect->prepare("UPDATE products SET prod_name=?, prod_des=?, prod_price=?, prod_label=?, prod_stock=? WHERE id=?");
    if ($stmt) {
        $result = $stmt->execute([$name, $description, $price, $label, $stock, $id]);
        
        if($result) {
            echo json_encode(['success' => true, 'message' => 'Product updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error updating product']);
        }
        // No need to close statement in PDO
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to prepare statement']);
    }
} else {
    echo json_encode(['error' => 'Invalid request method']);
}

$connect = null;
?>