<?php
require 'apirest.php';
require 'connect.php';
require 'utils.php';


$experiment_id = getIntGETParameterForMySQL('experiment_id', $con);

$levels = [];
$sql = "SELECT l.id as id, l.ordering as ordering FROM grecoh_experiment_level l where l.experiment_id = '${experiment_id}' order by l.ordering";

if($result = mysqli_query($con,$sql))
{
    $cr = 0;
    while($row = mysqli_fetch_assoc($result))
    {
        $levels[$cr]['id']    = $row['id'];
        $levels[$cr]['ordering'] = $row['ordering'];
        $cr++;
    }

    echo json_encode($levels);
}
else
{
    http_response_code(500);
}
