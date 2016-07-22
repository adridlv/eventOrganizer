<?php

$data = json_decode(file_get_contents("php://input"));
$username = mysql_real_escape_string($data->username);
$password = mysql_real_escape_string($data->password);
$fname = mysql_real_escape_string($data->fname);
$email = mysql_real_escape_string($data->email);
$image = mysql_real_escape_string($data->image);

$nameAux = str_replace(" ", "", $username);
$extimg = pathinfo($image, PATHINFO_EXTENSION);

$imageSQL = "user"."_".$nameAux.".".$extimg;

mysql_connect("localhost", "root", "") or die(mysql_error()); 
mysql_select_db("events_organizer_db") or die(mysql_error());

$query=mysql_query("SELECT * FROM USERS WHERE username='".$username."'");
$numrows=mysql_num_rows($query);

if($numrows==0)
{
	mysql_query("INSERT INTO 
		users (username,name,password,email,image) 
		VALUES ('$username', '$fname', '$password', '$email', '$imageSQL')");
	$message = true;
}else{
	$message = false;
}
	echo $message;
?>
