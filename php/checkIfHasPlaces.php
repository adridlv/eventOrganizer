<?php

$data = json_decode(file_get_contents("php://input"));
$event_name = mysql_real_escape_string($data->event_name);
$user_name = mysql_real_escape_string($data->user_name);

mysql_connect("localhost", "root", "") or die(mysql_error()); 
mysql_select_db("events_organizer_db") or die(mysql_error());

$result=mysql_query("SELECT PLACES FROM EVENTS WHERE NAME='".$event_name."'");
$query=mysql_query("SELECT * FROM EVENTS_PARTICIPATED WHERE EVENT_NAME='".$event_name."'");

$numrows=mysql_num_rows($query);

$row = mysql_fetch_array($result);
$numberOfPlaces = $row["PLACES"];

if($numrows<$numberOfPlaces)
{
	$message = true;
}else{
	$message = false;
}

$prueba = array('nmbPlaces'=>$numrows, 'hasPlaces'=>$message);

echo json_encode($prueba);
?>
