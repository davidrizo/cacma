<?php

require 'connect.php';
require 'utils.php';

$id = getGETParameterForMySQL('id', $con);

if(!$id)
{
    return http_response_code(400);
}

$sql = "SELECT id, title FROM grecoh_painting where id = '{$id}'";

if ($result = mysqli_query($con,$sql))
{
    $row = mysqli_fetch_assoc($result);

    $painting['id'] = $row['id'];
    $painting['title'] = $row['title'];

    echo json_encode($painting);
}
else
{
    http_response_code(404);
}
