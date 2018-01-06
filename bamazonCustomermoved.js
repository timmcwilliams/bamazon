var mysql = require("mysql");
var inquirer = require("inquirer");

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
        inquirer
            .prompt([
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
            .then(function (inquirerResponse) {
                if (inquirerResponse.confirm) {
                    console.log("\nYou Picked ID # " + inquirerResponse.id);
                    console.log("\nYou Chose this many to buy " + inquirerResponse.Count);
                }
                console.log("\nYou Picked ID # " + inquirerResponse.id);
                var itemNum = inquirerResponse.Count;
                var itemID = inquirerResponse.id;
                var prodPrice = res[0].price;
                if (itemNum > 2) {
                    console.log("you picked count  " + itemNum);
                    console.log("you picked id  " + itemID);
                    console.log("the price is  " + prodPrice);
                    var totalPrice = (itemNum * prodPrice);

                }
                console.log("you picked count  " + itemNum);
                console.log("you picked id  " + itemID);

                function readProducts() {
                    console.log("Select picked  product...\n");
                    connection.query("SELECT * FROM products WHERE item_id=" + itemID, function (err, res) {
                        if (err) throw err;
                        // Log all results of the SELECT statement
                        console.log(res);

                        console.log("The Current Quantity in Stock is " + res[0].stock_quantity);
                        if (res[0].stock_quantity < itemNum) {
                            console.log("too bad - not enough in stock!");
                        }
                        //   reduce stock and enter new stock
                        else {
                            var newStockQuantity = (res[0].stock_quantity - itemNum);
                            console.log("New Stock Calculation is " + newStockQuantity);
                            console.log("Your Total Bill is $" + totalPrice);
                            console.log("Updating In Stock quantities...\n");
                        }
                // testing scope
                        console.log("Your Total Bill is $" + totalPrice);
                        connection.query("UPDATE products SET stock_quantity = "+newStockQuantity+" WHERE item_id = "+itemID);
                    });                    
                }    
                readProducts();           
            });
            
        });
        
}



