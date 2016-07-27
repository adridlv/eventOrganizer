<?php

$data = json_decode(file_get_contents("php://input"));
$user = mysql_real_escape_string($data->user);
$user_following = mysql_real_escape_string($data->user_following);

mysql_connect("localhost", "root", "") or die(mysql_error()); 
mysql_select_db("events_organizer_db") or die(mysql_error());

mysql_query("DELETE FROM USERS_FOLLOWING WHERE USER = '$user' AND USER_FOLLOWING = '$user_following'");

?>
