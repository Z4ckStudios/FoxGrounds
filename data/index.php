<?php
    session_start();

    $valuesList = array(
        $_SESSION["toLogBox"],
        $_SESSION["stringTLM"],
        $_SESSION["toLogBoxPos"],
        $_SESSION["i"],
        $_SESSION["valuenum"],
    );

    $c = 0;

    for($z = 0; $z < count($valuesList); $z++) {
        echo "<p id='dataValue". $z ."' style='position: absolute; top: " . $c . "vh; text-indent: 1vw; color: #ffffff;'>" . json_encode($valuesList[$z]) . "</p>";
        $c += 2;
    }
?>