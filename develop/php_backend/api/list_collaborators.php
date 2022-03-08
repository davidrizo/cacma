<?php
require 'apirest.php';
require 'connect.php';

$collaborators = [];
$sql = "SELECT c.id as id, c.name as name, email FROM grecoh_collaborator c";
//error_log($sql);
if($result = mysqli_query($con,$sql))
{
    $cr = 0;
    while($row = mysqli_fetch_assoc($result))
    {
        $collaborators[$cr]['id']    = $row['id'];
        $collaborators[$cr]['name'] = $row['name'];
        $collaborators[$cr]['email'] = $row['email'];
        $cr++;
    }

    echo json_encode($collaborators);
}
else
{
    http_response_code(500);
}
