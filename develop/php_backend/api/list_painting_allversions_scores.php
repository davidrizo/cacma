<?php
require 'apirest.php';
require 'connect.php';
require 'utils.php';

$painting_id = getIntGETParameterForMySQL('painting_id', $con);

if (!$painting_id)
{
    return http_response_code(400);
}

if (isset($_GET['coherence'])) {
    $coherence = $_GET['coherence'];
    $sql = "select p.level_id, s.email, s.painting_version_id as painting_version_id, score, color_hexa from grecoh_user_painting_version_score s, grecoh_painting_version v, grecoh_painting p where p.id = v.painting_id && s.painting_version_id = v.id and v.painting_id = $painting_id and s.email in (select email from grecoh_experiment_level_question_user u, grecoh_experiment_level_question q where u.coherence = '$coherence' and u.question_id = q.id and q.level_id = p.level_id)";
} else {
    $sql = "select painting_version_id, score, color_hexa from grecoh_user_painting_version_score s, grecoh_painting_version v where s.painting_version_id = v.id and v.painting_id = $painting_id";
}

 
if ($result = mysqli_query($con,$sql)) {
    $scores = [];
    $cr = 0;
    while($row = mysqli_fetch_assoc($result))
    {
        $scores[$cr]['painting_version_id'] = $row['painting_version_id'];
        $scores[$cr]['value'] = $row['score'];
        $scores[$cr]['color'] = $row['color_hexa'];
        $cr++;
    }
    echo json_encode($scores);
} else {
    //error_log('Error with SQL:  ' . $sql);
    http_response_code(500);
}
