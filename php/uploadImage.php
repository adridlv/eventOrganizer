<?php
$filename = $_FILES['file']['name'];
$ext = pathinfo($filename, PATHINFO_EXTENSION);
$meta = $_POST;

$destination = "../upload/".$meta['type']."_".$meta['event_name']."_".$filename;
move_uploaded_file( $_FILES['file']['tmp_name'] , $destination);

?>