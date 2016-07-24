<?php

$data = json_decode(file_get_contents("php://input"));
$user = mysql_real_escape_string($data->user);
$user_following = mysql_real_escape_string($data->user_following);

mysql_connect("localhost", "root", "") or die(mysql_error()); 
mysql_select_db("events_organizer_db") or die(mysql_error());

$query=mysql_query("SELECT * FROM USERS_FOLLOWING
  WHERE USER='".$user."' AND USER_FOLLOWING='".$user_following."'");

$numrows=mysql_num_rows($query);

if($numrows==0)
{
	mysql_query("INSERT INTO USERS_FOLLOWING (USER,USER_FOLLOWING) 
		VALUES ('$user', '$user_following')");
	$message = "SUCCESS";
}else{
	$message = "You are already subscribed!";
}


echo $message;
?>
