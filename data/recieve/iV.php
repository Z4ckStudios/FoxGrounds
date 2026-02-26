<?php
    session_start();
    
    if(empty($_SESSION["data"])) {
        $_SESSION["data"] = "";
        $_SESSION["i"] = "";
    }

    $_SESSION["data"] = file_get_contents("php://input");
    $_SESSION["i"] = json_decode($_SESSION["data"]);

    echo json_encode($_SESSION["i"]);
?>