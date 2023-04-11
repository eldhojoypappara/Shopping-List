<?php

//Connect to the database
$db_host = "localhost";
$db_user = "root";
$db_password = "";
$db_name = "shopping_list";

$connection = mysqli_connect($db_host, $db_user, $db_password, $db_name);

if (!$connection) {
	die("Connection failed: " . mysqli_connect_error());
}

?>