<?php

require 'connect.php';
require 'utils.php';

$id = getGETParameterForMySQL('id', $con);

if(!$id)
{
    return http_response_code(400);
}


$sql = "SELECT pg.id as id, title, pr.name as painter FROM grecoh_painting as pg, grecoh_painter as pr where pg.painter_id = pr.id and pg.id = '{$id}'";

if ($result = mysqli_query($con,$sql))
{
    $row = mysqli_fetch_assoc($result);

    $painting['id'] = $row['id'];
    $painting['title'] = $row['title'];
    $painting['painter'] = $row['painter'];

    echo json_encode($painting);
}
else
{
    http_response_code(404);
}
