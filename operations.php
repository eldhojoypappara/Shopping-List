<?php
include('dbcon.php');

//Handle add item
if (isset($_POST["add_item"])) {
	$item_name = $_POST["item_name"];
	$query = "INSERT INTO items (name, checked) VALUES ('$item_name', 0)";
	mysqli_query($connection, $query);
}

//Handle delete item
if (isset($_POST["delete_item"])) {
	$item_id = $_POST["item_id"];
	$query = "DELETE FROM items WHERE id=$item_id";
	mysqli_query($connection, $query);
}

//Handle edit item
if (isset($_POST["edit_item"])) {
	$item_id = $_POST["item_id"];
	$item_name = $_POST["item_name"];
	$query = "UPDATE items SET name='$item_name' WHERE id=$item_id";
	mysqli_query($connection, $query);
}

//Handle mark item as checked
if (isset($_POST["mark_item"])) {
	$item_id = $_POST["item_id"];
	$checked = $_POST["checked"];
	$query = "UPDATE items SET checked=$checked WHERE id=$item_id";
	mysqli_query($connection, $query);
}

//Get all items from the database
$query = "SELECT * FROM items";
$result = mysqli_query($connection, $query);

$items = array();
while ($row = mysqli_fetch_assoc($result)) {
	$items[] = $row;
}

mysqli_close($connection);
echo json_encode($items);
?>
