<?php

$data = json_decode(file_get_contents("php://input"));
$user = mysql_real_escape_string($data->user);
$description = mysql_real_escape_string($data->description);
$name = mysql_real_escape_string($data->name);
$price = mysql_real_escape_string($data->price);
$places = mysql_real_escape_string($data->places);
$category = mysql_real_escape_string($data->category);
$image = mysql_real_escape_string($data->image);
$imagebckg = mysql_real_escape_string($data->imagebckg);

$nameAux = str_replace(" ", "", $name);

$extimg = pathinfo($image, PATHINFO_EXTENSION);
$extimgbckg = pathinfo($imagebckg, PATHINFO_EXTENSION);

$imageSQL = "img"."_".$nameAux.".".$extimg;
$imageBckgSQL = "bckg"."_".$nameAux.".".$extimgbckg;

mysql_connect("localhost", "root", "") or die(mysql_error()); 
mysql_select_db("events_organizer_db") or die(mysql_error());

$query=mysql_query("SELECT * FROM EVENTS WHERE name='".$name."'");
$numrows=mysql_num_rows($query);

if($numrows==0)
{
	mysql_query("INSERT INTO EVENTS (description,name,price,places,category,organizer,image, image_background) VALUES ('$description', '$name', '$price', '$places','$category', '$user', '$imageSQL', '$imageBckgSQL')");

	$message = true;
}else{
	$message = false;
}
	echo $message;
?>
