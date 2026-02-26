<?php
    session_start();

    if(empty($_SESSION["data"])) {
        $_SESSION["data"] = "";
        $_SESSION["stringTLM"] = "";
    }

    $_SESSION["data"] = file_get_contents("php://input");
    $_SESSION["stringTLM"] = json_decode($_SESSION["data"], true);

    echo json_encode($_SESSION["stringTLM"]);
?>