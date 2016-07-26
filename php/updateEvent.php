<?php

$data = json_decode(file_get_contents("php://input"));
$user = mysql_real_escape_string($data->user);
$description = mysql_real_escape_string($data->description);
$name = mysql_real_escape_string($data->name);
$price = mysql_real_escape_string($data->price);
$places = mysql_real_escape_string($data->places);
$category = mysql_real_escape_string($data->category);
$image = mysql_real_escape_string($data->file);
$imagebckg = mysql_real_escape_string($data->filebckg);

$nameAux = str_replace(" ", "", $name);

mysql_connect("localhost", "root", "") or die(mysql_error()); 
mysql_select_db("events_organizer_db") or die(mysql_error());

$query=mysql_query("UPDATE EVENTS SET DESCRIPTION = '$description', PRICE = '$price', PLACES = '$places', CATEGORY = '$category' WHERE NAME = '$name'");

if($image != "empty"){
	$extimg = pathinfo($image, PATHINFO_EXTENSION);
	$imageSQL = "img"."_".$nameAux.".".$extimg;
	$query=mysql_query("UPDATE EVENTS SET IMAGE = '$imageSQL' WHERE NAME = '$name'");
}

if($imagebckg != "empty"){
	$extimgbckg = pathinfo($imagebckg, PATHINFO_EXTENSION);
	$imageBckgSQL = "bckg"."_".$nameAux.".".$extimgbckg;
	$query=mysql_query("UPDATE EVENTS SET IMAGE_BACKGROUND = '$imageBckgSQL' WHERE NAME = '$name'");
}


echo $message;
?>
