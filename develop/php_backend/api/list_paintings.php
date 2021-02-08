<?php
require 'apirest.php';
require 'connect.php';
require 'utils.php';

$level_id = getIntGETParameterForMySQL('level_id', $con);
$email = getStringGETParameterForMySQL('email', $con);

$paintings = [];

if (!isset($email)) {
    $sql = "SELECT p.id as id, p.title as title, p.slug as slug, pp.name as painter, pp.slug as painter_slug FROM grecoh_painting p, grecoh_painter pp where pp.id = p.painter_id and p.level_id = '${level_id}'";
} else {
   $sql = "SELECT p.id as id, p.title as title, p.slug as slug, pp.name as painter, pp.slug as painter_slug, count(s.painting_version_id) as scored FROM grecoh_painting p, grecoh_painter pp, grecoh_painting_version v
left outer join grecoh_user_painting_version_score s on (s.painting_version_id = v.id and s.email = '${email}')
where v.painting_id = p.id 
and pp.id = p.painter_id and p.level_id = '${level_id}'  
group by p.id";
}

if($result = mysqli_query($con,$sql) or trigger_error("Cannot exectue query"))
{
    $cr = 0;
    while($row = mysqli_fetch_assoc($result))
    {
        $paintings[$cr]['id'] = $row['id'];
        $paintings[$cr]['title'] = $row['title'];
        $paintings[$cr]['slug'] = $row['slug'];
        $paintings[$cr]['painter'] = $row['painter'];
        $paintings[$cr]['painter_slug'] = $row['painter_slug'];
        if (isset($email)) {
            $paintings[$cr]['scored'] = intval($row['scored'])>0;
        }
        $cr++;
    }
    //error_log(json_encode($paintings));
    echo json_encode($paintings);
}
else
{
    http_response_code(404);
}
