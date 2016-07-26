<?php

$data = json_decode(file_get_contents("php://input"));
$username = mysql_real_escape_string($data->username);
$password = mysql_real_escape_string($data->password);
$fname = mysql_real_escape_string($data->fname);
$lname = mysql_real_escape_string($data->lname);
$email = mysql_real_escape_string($data->email);
$image = mysql_real_escape_string($data->image);
$imagebckg = mysql_real_escape_string($data->image_background);

$nameAux = str_replace(" ", "", $username);
$extimg = pathinfo($image, PATHINFO_EXTENSION);
$extimgbckg = pathinfo($imagebckg, PATHINFO_EXTENSION);

$imageSQL = "user"."_".$nameAux.".".$extimg;
$imagebckgSQL = "user_bckg"."_".$nameAux.".".$extimgbckg;

mysql_connect("localhost", "root", "") or die(mysql_error()); 
mysql_select_db("events_organizer_db") or die(mysql_error());

$query=mysql_query("SELECT * FROM USERS WHERE username='".$username."'");
$numrows=mysql_num_rows($query);

if($numrows==0)
{
	mysql_query("INSERT INTO 
		users (username,name,last_name,password,email,image,image_background) 
		VALUES ('$username', '$fname','$lname', '$password', '$email', '$imageSQL','$imagebckgSQL')");
	$message = true;
}else{
	$message = false;
}
	echo $message;
?>
