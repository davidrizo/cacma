<?php
require 'apirest.php';
require 'connect.php';
require 'utils.php';


//$input = file_get_contents('php://input');
$question_id = getIntGETParameterForMySQL('question_id', $con);
$email = getStringGETParameterForMySQL('email', $con);
$coherence = $_GET['coherence'];
if (!$coherence) {
    $coherence = 'null';
}

if(!$question_id || !email )
{
    return http_response_code(400);
}


$sql = "update grecoh_experiment_level_question_user set coherence = $coherence where email = '$email' and question_id = $question_id";

error_log('Error with SQL:  ' . $sql);

if ($result = mysqli_query($con,$sql)) {
    $changedAnswer['question_id'] = $question_id;
    $changedAnswer['email'] = $email;
    if ($changedAnswer != 'null') {
        $changedAnswer['coherence'] = $coherence;
    }
    echo json_encode($changedAnswer);
} else {
    http_response_code(500);
}
