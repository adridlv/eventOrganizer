<?php
$filename = $_FILES['file']['name'];
$ext = pathinfo($filename, PATHINFO_EXTENSION);
$meta = $_POST;

$name = $meta['textname'];
$name = str_replace(" ", "", $name);

$destination = "../upload/".$meta['type']."_".$name.".".$ext;
move_uploaded_file( $_FILES['file']['tmp_name'] , $destination);

?>