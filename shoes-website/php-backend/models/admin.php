<?php 

    include_once '../config/dbconnect.php';

   $servername = $_SERVER['REQUEST_METHOD'];

   if($servername == "GET") {

    $getProd = $connect->prepare("SELECT * FROM products");
    $getProd->execute();
    $result = $getProd->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($getProd);

   } elseif($servername == "POST") {
    
   }

?>

