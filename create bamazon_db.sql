CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE table_name (
    item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price DECIMAL(10,2),
    stock_quantity INTEGER(10),
    PRIMARY KEY (item_id)
);

