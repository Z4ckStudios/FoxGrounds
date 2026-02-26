<?php
    session_start();

    if(empty($_SESSION["toLogBox"])) {
        $_SESSION["toLogBox"] = "";
    }

    $data = file_get_contents("php://input");
    $_SESSION["toLogBox"] = json_decode($data, true);

    echo json_encode($_SESSION["toLogBox"]);
?>