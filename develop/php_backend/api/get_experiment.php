<?php

require 'apirest.php';
require 'connect.php';
require 'utils.php';

$id = getIntGETParameterForMySQL('id', $con);

if(!$id)
{
    return http_response_code(400);
}


$sql = "SELECT id, name, final_comment, user_comments_caption FROM grecoh_experiment where id = '{$id}'";

if ($result = mysqli_query($con,$sql))
{
    $row = mysqli_fetch_assoc($result);

    $experiment['id'] = $row['id'];
    $experiment['name'] = $row['name'];
    $experiment['final_comment'] = $row['final_comment'];
    $experiment['user_comments_caption'] = $row['user_comments_caption'];

    echo json_encode($experiment);
}
else
{
    http_response_code(500);
}
