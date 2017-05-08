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

var managerMenu = function() {
	inquirer.prompt([
	{
		type: "list",
		name: "options",
		message: "Select an option.",
		choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
	}
	]).then(function(answers) {
		if (answers.options === "View Products for Sale") {
			connection.query("SELECT * FROM products", function(err, res) {
				for (var i = 0; i < res.length; i++) {
				console.log("\nItem ID: " + res[i].item_id + " | " + "Item: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Stock Quantity: " + res[i].stock_quantity);
				};
				managerMenu();
			});
		} else if (answers.options === "View Low Inventory") {
			connection.query("SELECT * FROM products", function(err, res) {
				for (var i = 0; i < res.length; i++) {
					if (res[i].stock_quantity < 5) {
						console.log("\nItem ID: " + res[i].item_id + " | " + "Item: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Stock Quantity: " + res[i].stock_quantity);
					} else console.log(res[i].product_name + ": quantity is not low!");
				}
				managerMenu();
			})
		} else if (answers.options === "Add to Inventory") {
			connection.query("SELECT * FROM products", function(err, res) {
				for (var i = 0; i < res.length; i++) {
						console.log("\nItem ID: " + res[i].item_id + " | " + "Item: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Stock Quantity: " + res[i].stock_quantity);
				}
					inquirer.prompt([
				{
					type: "input",
					name: "askID",
					message: "\nPlease enter the ID of the item you would like to replenish."
				}, {
					type: "input",
					name: "askQuantity",
					message: "\nWhat will the new stock quanity be?"
				}
				]).then(function(answers) {
					var id = answers.askID;
					var amount = answers.askQuantity;

					connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: amount}, {
							item_id : id
					 	}], function(err, res) {});
					console.log("\nThank you! The quantity has been updated!");
					managerMenu();
				});
			});
		} else if (answers.options === "Add New Product") {
			inquirer.prompt([
			{
				type: "input",
				name: "newProduct",
				message: "\nWhat product would you like to add?"
			}, {
				type: "input",
				name: "department",
				message: "\nWhat department does the product go under?"
			}, {
				type: "input",
				name: "price",
				message: "\nWhat is the price per unit of the product (in dollars without a dollar sign)?"
			}, {
				type: "input",
				name: "amount",
				message: "\nHow many units of the product will be in stock?"
			}
			]).then(function(answers) {
				var newProduct = answers.newProduct;
				var dept = answers.department;
				var price = answers.price;
				var quant = answers.amount;

				connection.query("INSERT INTO products SET ?", {
					product_name : newProduct,
					department_name: dept,
					price: price,
					stock_quantity: quant
				}, function(err, res) {
					console.log("\nYour product has been added!")
				});
				managerMenu();
			});
	
		
		}
	});
}

managerMenu();

