<?php
require 'connect.php';
require 'utils.php';

$painting_version_id = getGETParameterForMySQL('painting_version_id', $con);

if (!$painting_version_id)
{
    return http_response_code(400);
}

// Return the count of votes for each painting
$sql = "select score, comments, email from grecoh_user_painting_version_score where painting_version_id = $painting_version_id";

if ($result = mysqli_query($con,$sql)) {
    $scores = [];
    $cr = 0;
    while($row = mysqli_fetch_assoc($result))
    {
        $scores[$cr]['painting_version_id'] = $painting_version_id;
        $scores[$cr]['score'] = $row['score'];
        $scores[$cr]['email'] = $row['email'];
        $scores[$cr]['comments'] = $row['comments'];
        $cr++;
    }
    echo json_encode($scores);
} else {
    error_log('Error with SQL:  ' . $sql);
    http_response_code(500);
}
