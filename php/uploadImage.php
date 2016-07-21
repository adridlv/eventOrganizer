<?php
$filename = $_FILES['file']['name'];
$ext = pathinfo($filename, PATHINFO_EXTENSION);
$meta = $_POST;

$evtname = $meta['event_name'];
$evtname = str_replace(" ", "", $evtname);

$destination = "../upload/".$meta['type']."_".$evtname.".".$ext;
move_uploaded_file( $_FILES['file']['tmp_name'] , $destination);

?>