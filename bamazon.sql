CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price INTEGER(11) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("One Hundred Years of Solitude Novel", "Books", 10, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Vacuum Cleaner", "Electronics", 85, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Kitchen Brush", "Homegoods", 5, 60);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Garden Tool Set", "Gardening", 45, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Wii U", "Gaming", 200, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Playing Cards", "Gaming", 3, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("The Lord of the Rings Book Set", "Books", 50, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("iPhone 6", "Electronics", 600, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Bar Keeper's Friend 2-Pack", "Homegoods", 20, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Miracle Gro", "Gardening", 10, 25);