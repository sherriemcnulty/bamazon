DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
   id INT NOT NULL AUTO_INCREMENT,
   product_name VARCHAR(100) NOT NULL,
   department_name VARCHAR(30) NOT NULL,
   price DECIMAL(10,2) NULL,
   stock_quantity INT NULL,
   product_sales INT NULL,
   PRIMARY KEY (id)
);

CREATE TABLE departments (
   id INT NOT NULL AUTO_INCREMENT,
   department_name VARCHAR(30) NOT NULL,
   over_head_cost DECIMAL(10,2) NULL,
   PRIMARY KEY (id)
);
   
-- Seed the products table
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Life and Death of a Druid Prince", "Books", 14.95, 1000, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Akhenaten: History, Fantasy and Ancient Egypt ", "Books", 34.45, 5000, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("DIY Solar Power: How To Power Everything From The Sun", "Books", 9.99, 1000, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("The Grass Is Always Greener Over The Septic Tank", "Electronics", 19.00, 1000, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("My First Lab Duo-Scope Microscope ", "Electronics", 12.80, 5000, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("DepStech Semi-rigid Wireless Endoscope", "Electronics", 39.99, 1000, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Borescope Camera Carrying Case Bag for Depstech WiFi Wireless & USB Endoscopes", "Electronics", 11.99, 1000, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Victoria GRN-101 Manual Grain Grinder with Low Hopper", "Home & Kitchen", 44.99, 2000, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("MIRA SAFETY Full Facepiece Reusable Respirator, Gas Masks", "Home & Kitchen", 314.87, 1000, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Propur Traveler Countertop Gravity Water Filter System", "Home & Kitchen", 189.00, 3000, 0);

-- Seed the departments table

INSERT INTO departments (department_name, over_head_cost)
VALUES ("Books", 3000.00);

INSERT INTO departments (department_name, over_head_cost)
VALUES ("Electronics", 4000.00);

INSERT INTO departments (department_name, over_head_cost)
VALUES ("Home & Kitchen", 5000.00);