<?php

require 'apirest.php';
require 'connect.php';
require 'utils.php';

$experiment_id = getIntGETParameterForMySQL('experiment_id', $con);

if(!$experiment_id)
{
    return http_response_code(400);
}

$answersExperiment = [];

$sql = "SELECT l.ordering as levelOrdering, lq.id as questionID, lq.ordering as questionOrdering, lq.question as question, lqu.email as email, lqu.answer as answer, lqu.coherence as coherence from grecoh_experiment_level l, grecoh_experiment_level_question lq, grecoh_experiment_level_question_user lqu where l.id = lq.level_id and lq.id = lqu.question_id and l.experiment_id = $experiment_id order by l.ordering, lq.ordering, lqu.email";

error_log($sql);

if($result = mysqli_query($con,$sql))
{
    $cr = 0;
    while($row = mysqli_fetch_assoc($result))
    {
        $answersExperiment[$cr]['levelOrdering'] = $row['levelOrdering'];
        $answersExperiment[$cr]['questionID'] = $row['questionID'];
        $answersExperiment[$cr]['questionOrdering'] = $row['questionOrdering'];
        $answersExperiment[$cr]['question'] = $row['question'];
        $answersExperiment[$cr]['email'] = $row['email'];
        $answersExperiment[$cr]['answer'] = $row['answer'];
        $answersExperiment[$cr]['coherence'] = $row['coherence'];
        $cr++;
    }

    error_log(json_encode($answersExperiment));
    echo json_encode($answersExperiment);
}
else
{
    http_response_code(500);
}
