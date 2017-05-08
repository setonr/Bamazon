var inquirer = require("inquirer");
var mysql = require ("mysql");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "Thegreenocto19!",
	database: "bamazon_db"
});

connection.connect(function(err) {
	if (err) throw err;
});

var displayItems = function() {
	console.log("Welcome to Bamazon!")
	connection.query("SELECT * FROM products", function(error, response) {
		for (var i = 0; i < response.length; i++) {
			console.log("\nItem ID: " + response[i].item_id + " | " + "Item: " + response[i].product_name + " | " + "Price: " + response[i].price);
		};
	});
};

var placeOrder = function() {
	inquirer.prompt([
	{
		type: "input",
		name: "id",
		message: "\nPlease enter the ID of the item you would like to purchase."
	}, {
		type: "input",
		name: "amount",
		message: "\nHow many would you like to purchase?"
	}
	]).then(function(answers) {
		var id = answers.id;
		var amount = answers.amount;
		
		connection.query("SELECT * FROM products WHERE ?", {item_id: id}, function(error, response) {
				if (error) throw error;
				else if (response[0].stock_quantity > amount) {
					var totalPrice = amount * response[0].price;
					console.log("\nYour total is $" + totalPrice + "!");
					connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: response[0].stock_quantity - amount}, {
						item_id : id
				 	}], function(err, res) {});
				} else if (response[0].stock_quantity < amount) {
					console.log("\nSorry! We don't have enough.");
				}
			});
		});
}

var customerService = function() {
	displayItems();
	placeOrder();
};

customerService();

