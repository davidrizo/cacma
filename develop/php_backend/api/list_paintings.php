<?php

require 'connect.php';

$paintings = [];
$sql = "SELECT p.id as id, p.title as title, p.slug as slug, pp.name as painter, pp.slug as painter_slug FROM grecoh_painting p, grecoh_painter pp where pp.id = p.painter_id";

if($result = mysqli_query($con,$sql))
{
    $cr = 0;
    while($row = mysqli_fetch_assoc($result))
    {
        $paintings[$cr]['id']    = $row['id'];
        $paintings[$cr]['title'] = $row['title'];
        $paintings[$cr]['slug'] = $row['slug'];
        $paintings[$cr]['painter'] = $row['painter'];
        $paintings[$cr]['painter_slug'] = $row['painter_slug'];
        $cr++;
    }

    echo json_encode($paintings);
}
else
{
    http_response_code(404);
}
