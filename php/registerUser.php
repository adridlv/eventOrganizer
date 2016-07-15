<?php

$data = json_decode(file_get_contents("php://input"));
$username = mysql_real_escape_string($data->username);
$password = mysql_real_escape_string($data->password);

mysql_connect("localhost", "root", "") or die(mysql_error()); 
mysql_select_db("events_organizer_db") or die(mysql_error());

$query=mysql_query("SELECT * FROM USERS WHERE username='".$username."'");
$numrows=mysql_num_rows($query);

if($numrows==0)
{
	mysql_query("INSERT INTO users (username,password) VALUES ('$username', '$password')");
	$message = "SUCCESS";
}else{
	$message = "FAIL";
}
	echo $message;
?>
