<?php

$data = json_decode(file_get_contents("php://input"));
$description = mysql_real_escape_string($data->description);
$name = mysql_real_escape_string($data->name);
$price = mysql_real_escape_string($data->price);
$places = mysql_real_escape_string($data->places);

mysql_connect("localhost", "root", "") or die(mysql_error()); 
mysql_select_db("events_organizer_db") or die(mysql_error());

$query=mysql_query("SELECT * FROM EVENTS WHERE name='".$name."'");
$numrows=mysql_num_rows($query);

if($numrows==0)
{
	mysql_query("INSERT INTO EVENTS (description,name,price,places) VALUES ('$description', '$name', '$price', '$places')");
	$message = "SUCCESS";
}else{
	$message = "FAIL";
}
	echo $message;
?>
