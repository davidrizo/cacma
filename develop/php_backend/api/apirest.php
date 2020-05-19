<?php

ini_set('display_errors',0);

// allow API REST
//TODO restringirlo....
// in order to work easily in IntelliJ: https://i.imgur.com/L7shNSf.png
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
