<?php
    session_start();

    if(empty($_SESSION["data"])) {
        $_SESSION["data"] = "";
        $_SESSION["toLogBoxPos"] = "";
    }

    $_SESSION["data"] = file_get_contents("php://input");
    $_SESSION["toLogBoxPos"] = json_decode($_SESSION["data"], true);

    echo json_encode($_SESSION["toLogBoxPos"]);
?>