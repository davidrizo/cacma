<?php
require 'apirest.php';
require 'connect.php';
require 'utils.php';

$id = getGETParameterForMySQL('painting_id', $con);
if(!$id)
{
    return http_response_code(400);
}

$painting_versions = [];
$sql = "SELECT v.id as id, color_hexa, p.slug as slug, pp.name as painter, pp.slug as painter_slug FROM grecoh_painting p, grecoh_painter pp, grecoh_painting_version v where v.painting_id = '${id}' and v.painting_id = p.id and pp.id = p.painter_id";

if($result = mysqli_query($con,$sql))
{
    $cr = 0;
    while($row = mysqli_fetch_assoc($result))
    {
        $painting_versions[$cr]['id'] = $row['id'];
        $painting_versions[$cr]['color_hexa'] = $row['color_hexa'];
        $painting_versions[$cr]['slug'] = $row['slug'];
        $painting_versions[$cr]['painter'] = $row['painter'];
        $painting_versions[$cr]['painter_slug'] = $row['painter_slug'];
        $cr++;
    }

    echo json_encode($painting_versions);
}
else
{
    http_response_code(404);
}
