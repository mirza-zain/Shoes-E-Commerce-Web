<?php 
header("Access-Control-Allow-Origin: *");

// For debugging, it's good to keep these
ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

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