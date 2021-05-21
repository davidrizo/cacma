<?php
require 'apirest.php';
require 'connect.php';
require 'utils.php';

$painting_id = getIntGETParameterForMySQL('painting_id', $con);
if(!$painting_id)
{
    return http_response_code(400);
}

// Return the count of votes for each painting version given the coherence
$sql = "select lqu.coherence, pvs.painting_version_id, avg(score) as average, STDDEV(score) as standard_deviation, pv.color_hexa from grecoh_painting gp, grecoh_painting_version pv, grecoh_user_painting_version_score pvs, grecoh_experiment_level_question_user lqu, grecoh_experiment_level_question lq where gp.id = painting_id and pv.id = pvs.painting_version_id and pvs.email = lqu.email and lq.id = lqu.question_id and lq.level_id = gp.level_id and painting_id = $painting_id GROUP by painting_version_id, lqu.coherence";
if ($result = mysqli_query($con,$sql)) {
    $statistics = [];
    $cr = 0;
    while($row = mysqli_fetch_assoc($result))
    {
        $statistics[$cr]['coherence'] = $row['coherence'];
        $statistics[$cr]['painting_version_id'] = $row['painting_version_id'];
        $statistics[$cr]['average'] = $row['average'];
        $statistics[$cr]['standard_deviation'] = $row['standard_deviation'];
        $statistics[$cr]['color'] = $row['color_hexa'];
        $cr++;
    }
    echo json_encode($statistics);
} else {
    //error_log('Error with SQL:  ' . $sql);
    http_response_code(500);
}
