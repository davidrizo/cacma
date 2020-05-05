<?php

function getGETParameterForMySQL($name, $connection) {
    // Extract, validate and sanitize the id.
    $result = ($_GET[$name] !== null && (int)$_GET[$name] > 0)? mysqli_real_escape_string($connection, (int)$_GET[$name]) : false;
    return $result;
}
