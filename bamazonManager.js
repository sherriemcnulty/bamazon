require("dotenv").config();

let mysql = require("mysql");
let inquirer = require("inquirer");
let table = require("cli-table");

managerView();

// managerView(): Prompt user for what to do & call appropriate function.
//
function managerView() {

   inquirer.prompt([{
      type: "list",
      name: "doWhat",
      message: "What do you want to do?",
      choices: ["View Products For Sale", "View Low Inventory", "Add More of An Existing Product", "Add New Product"]
   }]).then(function (data) {

      switch (data.doWhat) {

         case "View Products For Sale":
            printProductTable("all");
            break;
         case "View Low Inventory":
            printProductTable("low");
            break;
         case "Add More of An Existing Product":
            addExisting();
            break;
         case "Add New Product":
            addNewProduct();
            break;
      }
   });

} // managerView()

// printProductTable(option): If the input option is "all", then show the entire inventory. 
//                            Else show products with low inventory(5 or less units)
//
function printProductTable(option) {

   // Connect to the database.
   let connection = mysql.createConnection({

      host: "localhost",
      port: 3306,
      user: "root",
      password: process.env.SQL_PASSWORD,
      database: "bamazon_db"

   });

   connection.connect(function (err) {

      if (err) throw err;
      console.log("connected as id " + connection.threadId + "\n");

   });

   // Instantiate a table object.
   let productTable = new table({

      head: ['ID', 'Product', 'Department', 'Price', 'Stock Qty'],
      colWidths: [5, 50, 25, 10, 20]

   });

   // Extract inventory data from the database & display it in table format.
   connection.query("SELECT * FROM products", function (err, res) {

      if (err) throw err;

      res.forEach((r) => {

         if (option === "all") {
            productTable.push([r.id, r.product_name, r.department_name, parseFloat(r.price).toFixed(2), r.stock_quantity]);

         } else if (r.stock_quantity < 6) {
            productTable.push([r.id, r.product_name, r.department_name, parseFloat(r.price).toFixed(2), r.stock_quantity]);
         }
      });
      console.log(productTable.toString());

      // Disconnect from the database.
      connection.end();
   });
} // printProductTable()

// addExisting(): Add more units for existing products.
//
function addExisting() {

   inquirer.prompt([{
         type: "input",
         name: "id",
         message: "Product ID?"
      },
      {
         type: "input",
         name: "quantity",
         message: "Quantity?"
      }
   ]).then(function (data) {

      // Get existing quantity the database.
      let connection = mysql.createConnection({
         host: "localhost",
         port: 3306,
         user: "root",
         password: process.env.SQL_PASSWORD,
         database: "bamazon_db"
      });

      let sql = `SELECT * FROM products WHERE id = ${data.id}`
      connection.query(sql, function (err, res) {
         if (err) throw err;

         let newQuantity = parseInt(data.quantity) + parseInt(res[0].stock_quantity);
         updateQuantity(data.id, newQuantity);
      });

      // Disconnect from the database.
      connection.end();
   });

} // addExisting()

// updateQuantity(productId, newQty): Input: Update product quantity.
function updateQuantity(productId, newQty) {

   // Connect to the database.
   let connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: process.env.SQL_PASSWORD,
      database: "bamazon_db"
   });

   connection.connect(function (err) {
      if (err) throw err;
      console.log("connected as id " + connection.threadId + "\n");
   });

   let query = `UPDATE products SET stock_quantity = ${newQty} WHERE id = ${productId}`;

   connection.query(query, function (err, result) {
      if (err) throw err;
      console.log(`New inventory was successfully added.`);
   });

   // Disconnect from the database.
   connection.end();

} // updateQuantity()

// insertNewProduct(): Prompt for product name, department, price & quantity. Then insert it into the table. 
//
function insertNewProduct(departments) {

   inquirer.prompt([{
         type: "input",
         name: "product",
         message: "Product name?"
      },
      {
         type: "list",
         name: "department",
         message: "Department?",
         choices: departments
      },
      {
         type: "input",
         name: "price",
         message: "Price?"
      },
      {
         type: "input",
         name: "quantity",
         message: "Quantity?"
      }
   ]).then(function (answer) {

      // Connect to the database
      let connection = mysql.createConnection({
         host: "localhost",
         port: 3306,
         user: "root",
         password: process.env.SQL_PASSWORD,
         database: "bamazon_db"
      });

      // Insert new product.
      connection.query(
         "INSERT INTO products SET ?", {
            product_name: answer.product,
            department_name: answer.department,
            price: parseFloat(answer.price).toFixed(2),
            stock_quantity: parseInt(answer.quantity),
            products_sold: 0
         },
         function (err) {
            if (err) throw err;
            console.log(`${answer.product} was successfully added!`);
         }
      );

      // Disconnect from the database.
      connection.end();
   });

} // insertNewProduct()

function addNewProduct() {

   let departmentArr = [];

   // Connect to the database.
   let connection = mysql.createConnection({

      host: "localhost",
      port: 3306,
      user: "root",
      password: process.env.SQL_PASSWORD,
      database: "bamazon_db"

   });
   connection.connect(function (err) {
      if (err) throw err;
      console.log("connected as id " + connection.threadId + "\n");
   });

   // Extract department names from the product table
   let query = "SELECT department_name FROM departments";
   connection.query(query, function (err, res) {

      if (err) throw err;

      res.forEach((r) => {

         departmentArr.push(r.department_name);

      });
      insertNewProduct(departmentArr);
   });

   // Disconnect from the database.
   connection.end();

} // addNewProduct()