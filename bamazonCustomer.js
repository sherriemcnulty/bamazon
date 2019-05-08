require("dotenv").config();

let mysql = require("mysql");
let inquirer = require("inquirer");
let table = require("cli-table");

customerView();

// customerView(): Print the products table, then call customerPrompt() to get the user to submit an order.
//
function customerView() {

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

         productTable.push([r.id, r.product_name, r.department_name, `${r.price.toFixed(2)}`, r.stock_quantity]);
      });
      console.log(productTable.toString());

      // Get product id and quantity
      customerPrompt();

      // Disconnect from the database.
      connection.end();

   });
} // customerView()

// customerPrompt(): Prompt for product id and quantity of the item user wants to buy, then process the order.
//
function customerPrompt() {


   inquirer.prompt([{

      type: "input",
      name: "id",
      message: "\nWhat is the ID number of the item you want to buy?",

   }, {

      type: "input",
      name: "quantity",
      message: "How many do you want?"

   }]).then(function (data) {

      processOrder(data.id, data.quantity);

   });
} // customerPrompt()

// processOrder(): Verify there is enough in stock. If there is enough, update the database.
//
function processOrder(id, quantity) {

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

   // Extract the product information.
   connection.query(`SELECT * FROM products WHERE id = ${id}`, function (err, res) {
      if (err) throw err;

      // Verify there is enough in stock
      if (quantity > res[0].stock_quantity) {

         console.log("Sorry. We do not have enough in stock to fill your order.");

      } else {

         // Update the database.
         let totalPrice = (parseFloat(res[0].price) * parseFloat(quantity)).toFixed(2);
         let newStockQuantity = parseInt(res[0].stock_quantity) - parseInt(quantity);
         let newTotalSold = parseFloat(res[0].products_sold) + parseFloat(totalPrice);
         updateSales(id, newStockQuantity, newTotalSold);
         console.log(`Your order of ${quantity} units at $${res[0].price} comes to $${totalPrice}.`);
      }
   });

   // Disconnect from the database.
   connection.end();

} // processOrder()

// updateSales(): Subtract the number ordered from the quantity in stock.
//                        Then update the database with the new stock total.
//                        Finally, print the table for verification.
//
function updateSales(productId, stockQuantity, totalSold) {

   // Connect to the database.
   let connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: process.env.SQL_PASSWORD,
      database: "bamazon_db"
   });

   let sql = `UPDATE products SET stock_quantity = ${stockQuantity}, products_sold = ${totalSold} WHERE id = ${productId}`;
   connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Thank you for your purchase.");
   });

   // Disconnect from the database.
   connection.end();

} // updateSales()