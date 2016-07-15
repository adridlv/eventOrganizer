<?php
// incluir archivo de conexión
include('connection.php');
  // asignamos la función de conexion a una variable
  $con = connection();
  // realizamos la consulta SQL para recuperar todos los registros de la tabla
  $resultSQL = $con->query("SELECT * FROM events");
  // creamo una variable del tipo array la cual almacena todos los registros
  $dataArray = array();
  // iteramos todos los registros devueltos y llenamos el array
  while ($row = $resultSQL->fetch_assoc()){
 
   $dataArray[] = $row;
   
  }
 
  // convertimos el array al formato json y mostramos para que angular JS pueda formatear la información
  echo json_encode($dataArray);
 
?>