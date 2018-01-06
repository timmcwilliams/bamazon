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
                // for (i = 0; i < res.length; i++) {
                //     console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].stock_quantity + " | " + res[i].price);
                var answer = inquirerResponse.userInput;
                if (inquirerResponse.confirm) {
                    console.log("\nYou Picked line 1 " + inquirerResponse.userInput);
                    console.log(answer);
                    // console.log("\nYou Picked line 2  " + inquirerResponse.userInput);
                }
                if (answer === "View Items") {
                    menu();
                    // for (i = 0; i < res.length; i++) {
                    //     console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].stock_quantity + " | " + res[i].price);
            
                    //     console.log("____________________________________________");
                    //     console.log("--------------------------------------------");
                        
                    // }
                    
                }
                else if (answer == "Add Item") {
                    console.log("Hello Add");
                    addProd();

                }
                else if (answer == "Look at Low Inventory") {
                    console.log("hit it");
                    // var lookat = answer;
                    for (i = 0; i < res.length; i++) {
                        if (res[i].stock_quantity <= 9) {
                            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].stock_quantity);
                        }
                    }
                }
                else if (answer == "Add Inventory") {
                    var addinv = answer;
                    console.log(view);
                    addInv();
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
                                // validate: function (value) {
                                //     if (isNaN(value) === false) {
                                //         return true;
                                //     }
                                //     return false;
                                // }
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
                                    // add();
                                });
                        });
                }
                // end of add item function
                // ____________________________________________________________________________________________________________________________
                //start of add inventory
                function addInv() {
                    console.log("line 123");
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
                                    // function (err) {
                                    //     if (err) throw err;
                                    //     console.log("Your item was added successfully!");
                                    // add();

                                ])
                            menu();    
                        });
                }
            });
    });
}








