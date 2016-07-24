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
	$query=mysql_query("SELECT * FROM EVENTS_PARTICIPATED WHERE EVENT_NAME='".$event_name."' AND USER_NAME='".$user_name."'");
	$numrows=mysql_num_rows($query);

	if($numrows==0)
	{
		mysql_query("INSERT INTO EVENTS_PARTICIPATED (event_name,user_name) 
			VALUES ('$event_name', '$user_name')");
		$message = "SUCCESS";
	}else{
		$message = "You are already subscribed!";
	}
}

echo $message;
?>
