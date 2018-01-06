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
    menu();
})
var menu = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        for (i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].stock_quantity + " | " + res[i].price);

            console.log("____________________________________________");
            console.log("--------------------------------------------");
        }
        inquirer
            .prompt([
                {
                    type: "list",

                    message: "Scroll Down and Press the Spacebar when you have made your selection",

                    choices: ["View Items", "Add Item", "Look at Low Inventory", "Add Inventory"],
                    name: "userInput"
                },
                {
                    type: "confirm",
                    message: "Are you sure:",
                    name: "confirm",
                    default: true
                }
            ])
            .then(function (inquirerResponse) {
               
                var answer = inquirerResponse.userInput;
                if (inquirerResponse.confirm) {
                    console.log("\nYou Picked line 1 " + inquirerResponse.userInput);
                    console.log(answer);
                }
                if (answer === "View Items") {
                    menu();
                  
                }
                else if (answer == "Add Item") {
                    console.log("Hello Add");
                    addProd();

                }
                else if (answer == "Look at Low Inventory") {

                    for (i = 0; i < res.length; i++) {
                        if (res[i].stock_quantity <= 9) {
                            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].stock_quantity);
                            console.log("____________________________________________");
                            // addInv();
                            // menu();

                        }
                    }
                }
                else if (answer == "Add Inventory") {
                    var addinv = answer;
                }

                // ---------------------------------------------------------------------------------------------------------------------  
                function addProd() {
                    // Add a product
                    inquirer
                        .prompt([
                            {
                                name: "item",
                                type: "input",
                                message: "What is the product name you would like to submit?"
                            },
                            {
                                name: "stock",
                                type: "input",
                                message: "What is the stock quantity you need?"
                            },
                            {
                                name: "price",
                                type: "input",
                                message: "What would you like your selling price to be?"

                            }

                        ])

                        .then(function (answerP) {
                            // when finished prompting, insert a new item into the db with that info
                            connection.query(
                                "INSERT INTO products SET ? ",
                                {
                                    product_name: answerP.item,
                                    department_name: answerP.department,
                                    price: answerP.price,
                                    stock_quantity: answerP.stock
                                },
                                function (err) {
                                    if (err) throw err;
                                    console.log("Your item was added successfully!");

                                    menu();
                                });

                        });

                }

                function addInv() {
                    // prompt for info about the item needing inventory - this is an update function
                    inquirer
                        .prompt([
                            {
                                name: "item",
                                type: "input",
                                message: "What is the id of the product you would like to add inventory to?"
                            },
                            {
                                name: "stockadd",
                                type: "input",
                                message: "What is the stock quantity you need?"

                                // validate: function (value) {
                                //     if (isNaN(value) === false) {
                                //         return true;
                                //     }
                                //     return false;
                                // }
                            }
                        ])
                        .then(function (answerI) {
                            // when finished prompting, insert a new item into the db with that info
                            connection.query("update products SET ? WHERE ?",
                                [
                                    {
                                        stock_quantity: answerI.stockadd
                                    },
                                    {
                                        item_id: answerI.item
                                    },

                                ])
                            menu();
                        });
                }
            });
    });
}








