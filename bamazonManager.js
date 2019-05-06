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
      choices: ["View products for sale.", "View low inventory.", "Add more of an existing product.", "Add new product."]
   }]).then(function (data) {

      switch (data.doWhat) {

         case "View products for sale.":
            printProductTable("all");
            break;
         case "View low inventory.":
            printProductTable("low");
            break;
         case "Add more of an existing product.":
            addExisting();
            break;
         case "Add new product.":
            insertNewProduct();
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
            productTable.push([r.id, r.product_name, r.department_name, r.price, r.stock_quantity]);
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

   let sql = `UPDATE products SET stock_quantity = ${newQty} WHERE id = ${productId}`;

   connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
   });

   // Disconnect from the database.
   connection.end();

} // updateQuantity()

// insertNewProduct(): Prompt for product name, department, price & quantity. Then insert it into the table. 
//
function insertNewProduct() {

   inquirer.prompt([{
         type: "input",
         name: "product",
         message: "Product name?"
      },
      {
         type: "list",
         name: "department",
         message: "Department?",
         choices: ["Books", "Electronics", "Home & Kitchen", "Add new product."]
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

      // Get existing quantity the database.
      let connection = mysql.createConnection({
         host: "localhost",
         port: 3306,
         user: "root",
         password: process.env.SQL_PASSWORD,
         database: "bamazon_db"
      });

      connection.query(
         "INSERT INTO products SET ?", {
            product_name: answer.product,
            department_name: answer.department,
            price: parseFloat(answer.price).toFixed(2),
            stock_quantity: parseInt(answer.quantity),
            product_sales: 0
         },
         function (err) {
            if (err) throw err;
            console.log(`${answer.product} was added successfully!`);
         }
      );

      // Disconnect from the database.
      connection.end();
   });

} // insertNewProduct()