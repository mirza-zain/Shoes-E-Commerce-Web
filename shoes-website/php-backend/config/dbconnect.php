<?php

    header("Access-Control-Allow-Origin");
    header("Content-Type: application/json; charset = UTF-8");
    header("Access-Content-Allow-Methods: GET, PUT, DELETE, POST");
    header("Access-Content-Allow-Headers: Content-Type, Allow-Content-Allow-Headers, Authorization, X-Requested-With");


    $servername = 'sql307.infinityfree.com';
    $username = 'if0_39577041';
    $password = 'Bakugo786';
    $database = 'if0_39577041_shoesdb';

    $connect = new PDO("mysql:host=$servername; dbname=$database", $username, $password);
    $connect -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


?>