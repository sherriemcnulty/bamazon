DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
   id INT NOT NULL AUTO_INCREMENT,
   product_name VARCHAR(100) NOT NULL,
   department_name VARCHAR(30) NOT NULL,
   price DECIMAL(10,2) NOT NULL,
   stock_quantity INT NOT NULL,
   products_sold DECIMAL(10,2) NOT NULL,
   PRIMARY KEY (id)
);

CREATE TABLE departments (
   id INT NOT NULL AUTO_INCREMENT,
   department_name VARCHAR(30) NOT NULL,
   over_head_cost DECIMAL(10,2) NOT NULL,
   total_profit DECIMAL(10,2) NOT NULL,
   PRIMARY KEY (id)
);
   
-- Seed the products table
INSERT INTO products (product_name, department_name, price, stock_quantity, products_sold)
VALUES ("Life and Death of a Druid Prince", "Books", 14.95, 1000, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, products_sold)
VALUES ("Akhenaten: History, Fantasy and Ancient Egypt ", "Books", 34.45, 5000, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, products_sold)
VALUES ("Home And Garden, Heirloom Seeds", "Garden", 15.95, 1000, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, products_sold)
VALUES ("Open Seed Vault, Herb Garden Seeds", "Garden", 15.45, 1000, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, products_sold)
VALUES ("My First Lab Duo-Scope Microscope ", "Electronics", 12.80, 5000, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, products_sold)
VALUES ("DepStech Semi-rigid Wireless Endoscope", "Electronics", 39.99, 1000, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, products_sold)
VALUES ("Borescope Camera Carrying Case Bag for Depstech WiFi Wireless & USB Endoscopes", "Electronics", 11.99, 1000, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, products_sold)
VALUES ("Victoria GRN-101 Manual Grain Grinder with Low Hopper", "Home & Kitchen", 44.99, 2000, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, products_sold)
VALUES ("MIRA SAFETY Full Facepiece Reusable Respirator, Gas Masks", "Hardware", 314.87, 1000, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, products_sold)
VALUES ("Propur Traveler Countertop Gravity Water Filter System", "Home & Kitchen", 189.00, 3000, 0);

-- Seed the departments table

INSERT INTO departments (department_name, over_head_cost, total_profit)
VALUES ("Books", 300.00, 0.00);

INSERT INTO departments (department_name, over_head_cost, total_profit)
VALUES ("Garden", 600.00, 0.00);

INSERT INTO departments (department_name, over_head_cost, total_profit)
VALUES ("Electronics", 800.00, 0.00);

INSERT INTO departments (department_name, over_head_cost, total_profit)
VALUES ("Home & Kitchen", 500.00, 0.00);

INSERT INTO departments (department_name, over_head_cost, total_profit)
VALUES ("Hardware", 500.00, 0.00);