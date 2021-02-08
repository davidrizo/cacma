<?php
require 'apirest.php';
require 'connect.php';
require 'utils.php';

$painting_id = getIntGETParameterForMySQL('painting_id', $con);
if(!$painting_id)
{
    return http_response_code(400);
}

// Return the count of votes for each painting
$sql = "select painting_version_id, avg(score) as average, STDDEV(score) as standard_deviation from grecoh_painting_version pv, grecoh_user_painting_version_score pvs where pv.id = pvs.painting_version_id and painting_id = $painting_id GROUP by painting_version_id";
if ($result = mysqli_query($con,$sql)) {
    $statistics = [];
    $cr = 0;
    while($row = mysqli_fetch_assoc($result))
    {
        $statistics[$cr]['painting_version_id'] = $row['painting_version_id'];
        $statistics[$cr]['average'] = $row['average'];
        $statistics[$cr]['standard_deviation'] = $row['standard_deviation'];
        $cr++;
    }
    echo json_encode($statistics);
} else {
    //error_log('Error with SQL:  ' . $sql);
    http_response_code(500);
}
