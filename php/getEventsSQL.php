<?php

$data = json_decode(file_get_contents("php://input"));
$table = mysql_real_escape_string($data->table);
$typeQuery = mysql_real_escape_string($data->typeQuery);
$user = mysql_real_escape_string($data->user);


mysql_connect("localhost", "root", "") or die(mysql_error()); 
mysql_select_db("events_organizer_db") or die(mysql_error());

if($typeQuery == "simple"){
  $resultSQL = mysql_query("SELECT * FROM $table");
}else{
  $resultSQL = mysql_query("SELECT * FROM $table where name in (select event_name from events_participated where user_name = '$user')");
}

$dataArray = array();

while ($row = mysql_fetch_assoc($resultSQL)){
  $dataArray[] = $row;
}

  // convertimos el array al formato json y mostramos para que angular JS pueda formatear la información
echo json_encode($dataArray);

?>