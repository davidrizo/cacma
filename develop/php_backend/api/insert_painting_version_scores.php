<?php

require 'connect.php';

$input=file_get_contents('php://input');

$data = json_decode($input);

$painting_id=$data->painting_id;
$email=$data->email;

foreach ($data->scores as &$score) {
    $painting_version_id = $score->painting_version_id;
    $score_value = $score->value;
    if (isset($score->comments)) {
        $comments = $score->comments;
    } else {
        $comments = '';
    }


    /*$sql = "INSERT INTO `grecoh_user_painting_version_score` (`email`, `painting_version_id`, `score`) VALUES ('$email', '$painting_version_id', '$score_value')
    ON DUPLICATE KEY score = '$score_value'";*/

    $sql = "INSERT IGNORE INTO `grecoh_user_painting_version_score` (`email`, `painting_version_id`, `score`, `comments`) VALUES ('$email', '$painting_version_id', '$score_value', '$comments')";

    if ($result = mysqli_query($con,$sql)) {
        echo true;
    } else {
        //http_response_code(500);
        error_log('Error with SQL:  ' . $sql);
        echo false;
    }
}

