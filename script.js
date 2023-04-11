function loadItems() {
    // Clear the table
    $("#item_list").empty();
	$("#item_list").append('<tr><th></th><th>Item</th><th>Actions</th></tr>');

    // Get the items from the server
    $.getJSON("operations.php", function(data) {
        // Loop through each item and add it to the table
        $.each(data, function(index, item) {
            var checked = item.checked == 1 ? "checked" : "";
            var itemHTML = "<tr><td><input type='checkbox' class='check_item' data-id='" + item.id + "' " + checked + "></td><td> " + item.name + "</td>";
            itemHTML += "<td><i class='fa-solid fa-pen-to-square edit_button' title='Edit' data-id='" + item.id + "'></i>&nbsp &nbsp<i class='fa-solid fa-trash delete_button' title='Delete'  data-id='" + item.id + "'></i></td></tr>";
            $("#item_list").append(itemHTML);
        });

        // Bind the click events for the buttons
        bindButtonClicks();
    });
}

function bindButtonClicks() {
    // Delete item button
    $(".delete_button").click(function() {
        var item_id = $(this).data("id");
        $.post("operations.php", {delete_item: true, item_id: item_id}, function() {
            loadItems();
        });
    });

    // Edit item button
    $(".edit_button").click(function() {
        var item_id = $(this).data("id");
        var item_name = $(this).parent().prev().children("input[type='checkbox']").next().text();
        var new_item_name = prompt("Enter a new name for the item:", item_name);
        if (new_item_name != null && new_item_name != "") {
            $.post("operations.php", {edit_item: true, item_id: item_id, item_name: new_item_name}, function() {
                loadItems();
            });
        }
    });

    // Check item checkbox
    $(".check_item").change(function() {
        var item_id = $(this).data("id");
        var checked = $(this).is(":checked") ? 1 : 0;
        $.post("operations.php", {mark_item: true, item_id: item_id, checked: checked}, function() {
            loadItems();
        });
    });
}

$(document).ready(function() {
    // Load items on page load
    loadItems();

    // Add item button
    $("#add_button").click(function() {
        var item_name = $("#item_name").val();
        if (item_name != "") {
            $.post("operations.php", {add_item: true, item_name: item_name}, function() {
                loadItems();
                $("#item_name").val("");
            });
        }
    });
});
