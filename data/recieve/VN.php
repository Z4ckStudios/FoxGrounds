<?php
    session_start();

    if(empty($_SESSION["data"])) {
        $_SESSION["data"] = "";
        $_SESSION["valuenum"] = "";
    }

    $_SESSION["data"] = file_get_contents("php://input");
    $_SESSION["valuenum"] = json_decode($_SESSION["data"]);

    echo json_encode($_SESSION["valuenum"]);
?>