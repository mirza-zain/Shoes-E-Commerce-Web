<?php

    $servername = 'localhost';
    $username = 'shoes_user';
    $password = 'kachan786';
    $database = 'shoes_ecommerce';

    $connect = new mysqli($servername, $username, $password, $database);

    if($connect -> connect_error)
    {
        die('connection failed'. $connect -> connect_error);
    }

?>