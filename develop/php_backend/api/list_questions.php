<?php
require 'apirest.php';
require 'connect.php';
require 'utils.php';


$experiment = getIntGETParameterForMySQL('experiment', $con);

$questions = [];
$sql = "SELECT q.id as id, q.ordering as ordering, q.question, q.experiment_id FROM grecoh_question q order by q.ordering and q.experiment_id = '${experiment}'";

if($result = mysqli_query($con,$sql))
{
    $cr = 0;
    while($row = mysqli_fetch_assoc($result))
    {
        $questions[$cr]['id']    = $row['id'];
        $questions[$cr]['ordering'] = $row['ordering'];
        $questions[$cr]['question'] = $row['question'];
        $cr++;
    }

    echo json_encode($questions);
}
else
{
    http_response_code(404);
}
