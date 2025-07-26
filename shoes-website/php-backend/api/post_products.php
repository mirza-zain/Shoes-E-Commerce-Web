<?php 

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS"); // Add OPTIONS
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // End script execution after sending headers
    exit(0);
    }

    include_once '../config/dbconnect.php';

    $request_method = $_SERVER['REQUEST_METHOD'];

    if($request_method == "POST") {
        
         $name = isset($_POST['itemName']) ? $_POST['itemName'] : '';
    $description = isset($_POST['itemDes']) ? $_POST['itemDes'] : '';
    $price = isset($_POST['itemPrice']) ? $_POST['itemPrice'] : '';
    $stock = isset($_POST['itemStock']) ? $_POST['itemStock'] : '';
    $label = isset($_POST['itemLabel']) ? $_POST['itemLabel'] : '';
    
    // Basic validation
    if (empty($name) || empty($description) || empty($price) || empty($stock) || empty($label)) {
        http_response_code(400);
        echo json_encode(['error' => 'Incomplete data. Please fill all text fields.']);
        exit;
    }

    // --- Handle File Upload ---
    $imagePath = null;
    // The key 'itemPic' must match the key from your formData.append() call
    if (isset($_FILES['itemPic']) && $_FILES['itemPic']['error'] == 0) {
        $uploadDir = '../uploads/';
        $fileExtension = pathinfo($_FILES['itemPic']['name'], PATHINFO_EXTENSION);
        $uniqueFilename = uniqid() . '-' . time() . '.' . $fileExtension;
        $targetFile = $uploadDir . $uniqueFilename;
        
        if (move_uploaded_file($_FILES['itemPic']['tmp_name'], $targetFile)) {
            $imagePath = 'uploads/' . $uniqueFilename; // Path to store in DB
        }
    }
        
        $sql = "INSERT INTO products (name, description, price, stock, label, image_url) VALUES (?, ?, ?, ?, ?, ?)";
        $query = $connect->prepare($sql);
        $query->execute([$name, $description, $price, $stock, $label, $imagePath]);
        
        http_response_code(201);
        echo json_encode(['message' => 'Product Added Successfully']);
    } 
    // elseif($request_method == 'PUT') 
    // {
    //     $data = json_decode(file_get_contents('php://input'));
    //     $id = isset($_GET['id']) ? $_GET['id'] : null;

    //     if(!$id) {
    //         http_response_code(400);
    //         echo json_encode(['error' => 'Product ID is not valid']);
    //         exit;
    //     } 
        
    //     $sql = 'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, label = ?, image_url = ? WHERE id = ?';
    //     $query = $connect->prepare($sql);
    //     $query->execute([$name, $description, $price, $stock, $label, $imagePath]);
    //     http_response_code(200);
    //     echo json_encode(['message' => 'Product updated successfully']);
    // } 
    // elseif($request_method == 'DELETE') 
    // {
        
    // }

?>

