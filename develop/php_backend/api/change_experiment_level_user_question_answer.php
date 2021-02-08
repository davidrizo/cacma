<?php
require 'apirest.php';
require 'connect.php';
require 'utils.php';


//$input = file_get_contents('php://input');
$input = $_GET['jsondata']; // no he conseguido que funcionara con POST

$data = json_decode($input);

$result = true;

foreach ($data as &$row) {
    $question_id=$row->question_id;
    $email=$row->email;
    $answer=$row->answer;

    $sql = "replace INTO `grecoh_experiment_level_question_user` (`question_id`, `email`, `answer`) values ('$question_id', '$email', '$answer')";
    $result = $result && mysqli_query($con,$sql);
}

if ($result) {
    response(200,"Answers successfully inserted/updated", NULL);
    // http_response_code(200);
} else {
    // error_log('Error with SQL:  ' . $sql);
    response(500,"Error inserting comments",mysqli_error($con));
}


function response($status,$status_message,$data)
{
    header("Access-Control-Allow-Origin: *");//NO VA en 000webhost !!!
    header("HTTP/1.1 ".$status);
    header('content-type: application/json; charset=utf-8');

    $response['status']=$status;
    $response['message']=$status_message;
    $response['detailedMessage']=$data;

    $json_response = json_encode($response);
    // error_log($json_response);
    echo $json_response;
}
