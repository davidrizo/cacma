<?php

require 'apirest.php';
require 'connect.php';
require 'utils.php';

$id = getIntGETParameterForMySQL('id', $con);

if(!$id)
{
    return http_response_code(400);
}


$sql = "SELECT pg.id as id, title, pg.slug as slug, pr.name as painter, pr.slug as painter_slug, url, painting_version_id FROM grecoh_painting as pg, grecoh_painter as pr where pg.painter_id = pr.id and pg.id = '{$id}'";

if ($result = mysqli_query($con,$sql))
{
    $row = mysqli_fetch_assoc($result);

    $painting['id'] = $row['id'];
    $painting['title'] = $row['title'];
    $painting['painter'] = $row['painter'];
    $painting['url'] = $row['url'];
    $painting['slug'] = $row['slug'];
    $painting['painter_slug'] = $row['painter_slug'];
    $painting['painting_version_id'] = $row['painting_version_id'];

    echo json_encode($painting);
}
else
{
    http_response_code(500);
}
