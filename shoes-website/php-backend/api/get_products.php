<?php 

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

include_once '../config/dbconnect.php';

$request_method = $_SERVER['REQUEST_METHOD'];

if($request_method == "GET") {
    try{
        $getProd = $connect->prepare("SELECT * FROM products");
        $getProd->execute();
        $result = $getProd->fetchAll(PDO::FETCH_ASSOC);
    
        echo json_encode($result);
    } catch(PDOException $e) {
        echo json_encode(['error' => 'Database Error' . $e->getMessage()]);
    } 
}


?>