<?php

$data = json_decode(file_get_contents("php://input"));
$event_name = mysql_real_escape_string($data->event_name);
$user_name = mysql_real_escape_string($data->user_name);

mysql_connect("localhost", "root", "") or die(mysql_error()); 
mysql_select_db("events_organizer_db") or die(mysql_error());

$query=mysql_query("SELECT * FROM EVENTS_PARTICIPATED 
  WHERE EVENT_NAME='".$event_name."' AND USER_NAME='".$user_name."'");

$numrows=mysql_num_rows($query);

if($numrows==0)
{
  $message = false;
}else{
  $message = true;
}
  echo $message;
?>
