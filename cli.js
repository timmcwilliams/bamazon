var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "password",
	database: "bamazon_db"
})
connection.connect(function (err) {
	console.log("connected as id " + connection.threadId/* + "\n"*/);
	if (err) throw err;
	show();
})
var show = function () {
	connection.query("SELECT * FROM products", function (err, res) {
		for (i = 0; i < res.length; i++) {
			console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].stock_quantity + " | " + res[i].price);

			console.log("____________________________________________");
			console.log("--------------------------------------------");
		}
	// });

//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.

		// once you have the items, prompt the user for which they'd like to buy
		inquirer
	  .prompt([
			//  a basic text prompt.
			{
				type: "input",
				message: "What ID of Item Do you Want to Purchase?",
				name: "id"
			},
			{
				type: "confirm",
				message: "Are you sure:",
				name: "confirm",
				default: true
			},
			{
				type: "input",
				message: "How Many",
				name: "Count"
			},

		])
			.then(function(inquirerResponse) {
				// If the inquirerResponse confirms, we displays the inquirerResponse's response from the answer.
				if (inquirerResponse.confirm) {
					console.log("\nYou Picked ID # " + inquirerResponse.id);
					console.log("\nYou Chose " + inquirerResponse.Count);
				}
				read
			});	
			
		});
		
}

// }		console.log("test");
// function readProducts() {
//   console.log("Select picted  product...\n");
//   connection.query("SELECT * FROM products", function(err, res) {
//     if (err) throw err;
//     // Log all results of the SELECT statement
//     console.log(res);
//     connection.end();
//   });
// }
// readProducts();