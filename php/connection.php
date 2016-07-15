<?php
//*******FUNCION PRINCIPAL PARA LA CONEXION A LA BASE DE DATOS MySQL*********//
function connection()
{ 
// ** Ajustes de MySQL ** // 
	global $DB_HOST; 
	global $DB_USER; 
	global $DB_PASSWORD; 
	global $DB_NAME; 
	/** Host de MySQL (es muy probable que no necesites cambiarlo) */ 
	$DB_HOST = 'localhost';
	/** Tu nombre de usuario de MySQL */ 
	$DB_USER = 'root';
	/** Tu password de MySQL */ 
	$DB_PASSWORD = '';
	/** El nombre de tu base de datos */ 
	$DB_NAME = 'events_organizer_db';


	$mysqli = @new mysqli($DB_HOST, $DB_USER, $DB_PASSWORD, $DB_NAME); 
	if (mysqli_connect_errno()) {
		printf(error_db_connect());
		exit();
	}
	return $mysqli;
}

?>