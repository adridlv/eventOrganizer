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

mysql_connect("localhost", "root", "") or die(mysql_error()); 
mysql_select_db("events_organizer_db") or die(mysql_error());

$query=mysql_query("UPDATE USERS SET NAME='$fname', LAST_NAME = '$lname', EMAIL='$email', PASSWORD='$password' WHERE USERNAME = '$username'");

if($image != "empty"){
	$extimg = pathinfo($image, PATHINFO_EXTENSION);
	$imageSQL = "user"."_".$nameAux.".".$extimg;
	$query=mysql_query("UPDATE USERS SET IMAGE = '$imageSQL' WHERE NAME = '$username'");
}

if($imagebckg != "empty"){
	$extimgbckg = pathinfo($imagebckg, PATHINFO_EXTENSION);
	$imageBckgSQL = "user_bckg"."_".$nameAux.".".$extimgbckg;
	$query=mysql_query("UPDATE USERS SET IMAGE_BACKGROUND = '$imageBckgSQL' WHERE NAME = '$username'");
}


echo $message;
?>
