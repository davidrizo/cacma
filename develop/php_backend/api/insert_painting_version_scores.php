<?php
require 'apirest.php';
require 'connect.php';
require 'utils.php';

//$input = file_get_contents('php://input');
$input = $_GET['jsondata']; // no he conseguido que funcionara con POST

$data = json_decode($input);

$painting_id=$data->painting_id;
$email=$data->email;

$sql = "replace INTO `grecoh_user_painting_version_score` (`email`, `painting_version_id`, `score`, `comments`)";

$first = true;

foreach ($data->scores as &$score) {
    $painting_version_id = $score->painting_version_id;
    $score_value = $score->value;
    if (isset($score->comments)) {
        $comments = $score->comments;
    } else {
        $comments = '';
    }

    // error_log($score->value . ' --> ' . $score->comments . ' --> ' . $comments);


    if ($first) {
        $first = false;
        $sql = $sql . ' values ';
    } else {
        $sql = $sql . ', ';
    }

    $sql = $sql . "('$email', '$painting_version_id', '$score_value', '$comments')";
}


// error_log($sql);
if ($result = mysqli_query($con,$sql)) {
    response(200,"Scores successfully inserted", NULL);
    // http_response_code(200);
} else {
    // error_log('Error with SQL:  ' . $sql);
    response(500,"Error inserting scores",mysqli_error($con));
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
