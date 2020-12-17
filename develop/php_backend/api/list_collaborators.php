<?php
require 'apirest.php';
require 'connect.php';

$collaborators = [];
$sql = "SELECT c.id as id, c.name as name FROM grecoh_collaborator c";

if($result = mysqli_query($con,$sql))
{
    $cr = 0;
    while($row = mysqli_fetch_assoc($result))
    {
        $collaborators[$cr]['id']    = $row['id'];
        $collaborators[$cr]['name'] = $row['name'];
        $cr++;
    }

    echo json_encode($collaborators);
}
else
{
    http_response_code(404);
}