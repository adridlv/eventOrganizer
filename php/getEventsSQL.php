<?php

$data = json_decode(file_get_contents("php://input"));
$table = mysql_real_escape_string($data->table);
$typeQuery = mysql_real_escape_string($data->typeQuery);
$user = mysql_real_escape_string($data->user);


mysql_connect("localhost", "root", "") or die(mysql_error()); 
mysql_select_db("events_organizer_db") or die(mysql_error());

if($typeQuery == "simple"){
  $resultSQL = mysql_query("SELECT * FROM $table");
}else if($typeQuery == "subbedEvents"){
  $resultSQL = mysql_query("SELECT * FROM $table where name in (select event_name from events_participated where user_name = '$user')");
}else if($typeQuery == "getFollowingUsers"){
	$eventName = mysql_real_escape_string($data->eventName);
	$resultSQL = mysql_query("SELECT * FROM USERS WHERE USERNAME IN (SELECT USER_NAME FROM EVENTS_PARTICIPATED where EVENT_NAME = 'alrumbo' AND USER_NAME IN (SELECT USER_FOLLOWING FROM USERS_FOLLOWING WHERE USER = '$user')) AND USERNAME <> '$user'");
}
else if($typeQuery == "getUnknownUsers"){
	$eventName = mysql_real_escape_string($data->eventName);
	$resultSQL = mysql_query("SELECT * FROM USERS WHERE USERNAME IN (SELECT USER_NAME FROM EVENTS_PARTICIPATED where EVENT_NAME = '$eventName' AND USER_NAME NOT IN (SELECT USER_FOLLOWING FROM USERS_FOLLOWING WHERE USER = '$user')) AND USERNAME <> '$user'");
}

$dataArray = array();

while ($row = mysql_fetch_assoc($resultSQL)){
  $dataArray[] = $row;
}

  // convertimos el array al formato json y mostramos para que angular JS pueda formatear la información
echo json_encode($dataArray);

?>