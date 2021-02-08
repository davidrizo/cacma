<?php

require 'apirest.php';
require 'connect.php';
require 'utils.php';

$level_id = getIntGETParameterForMySQL('level_id', $con);
$email = getStringGETParameterForMySQL('email', $con);

if(!$level_id || !$email)
{
    return http_response_code(400);
}

$questions = [];

$sql = "SELECT q.id as question_id, q.question as question, u.answer as answer FROM 
grecoh_experiment_level_question q 
left outer join grecoh_experiment_level_question_user u on (u.question_id = q.id and u.email = '${email}')
where q.level_id = '{$level_id}'";

if($result = mysqli_query($con,$sql))
{
    $cr = 0;
    while($row = mysqli_fetch_assoc($result))
    {
        $questions[$cr]['question_id'] = $row['question_id'];
        $questions[$cr]['question'] = $row['question'];
        $questions[$cr]['answer'] = $row['answer'];
        $cr++;
    }

    echo json_encode($questions);
}
else
{
    http_response_code(404);
}
