<?php

    header("Access-Control-Allow-Origin");
    header("Content-Type: application/json; charset = UTF-8");
    header("Access-Content-Allow-Methods: GET, PUT, DELETE, POST");
    header("Access-Content-Allow-Headers: Content-Type, Allow-Content-Allow-Headers, Authorization, X-Requested-With");


    $servername = '127.0.0.1';
    $username = 'shoes_user';
    $password = 'kachan786';
    $database = 'shoes_ecommerce';

    $connect = new PDO("mysql:host=$servername; dbname=$database", $username, $password);
    $connect -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION)

    if($connect -> connection_status)
    {
        echo json_encode('connection failed'. $connect -> connection_status);
    }

?>