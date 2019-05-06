require("dotenv").config();

let mysql = require("mysql");
let inquirer = require("inquirer");
let table = require("cli-table");

supervisorView();

function supervisorView() {

   inquirer.prompt([{
      type: "list",
      name: "doWhat",
      message: "What do you want to do?",
      choices: ["View Product Sales by Department", "Create New Department"]
   }]).then(function (data) {

      switch (data.doWhat) {

         case "View Product Sales by Department":
            printSubervisorTable();
            break;
         case "Create New Department":
            createNewDepartment();
            break;
         default:
            console.log("Oops! Invalid option.");
            break;
      }
   });
} // supervisorView()


function printSubervisorTable() {

   let productTable = []; // will be loaded to print table

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

   // Extract total sales for each department from the products table.
   let sqlCommand = `SELECT departments.id, departments.department_name, departments.over_head_cost, SUM(products.products_sold) AS sales
                     FROM products
                     INNER JOIN departments USING(department_name)
                     GROUP BY department_name;`
   connection.query(sqlCommand, function (err, res) {
      if (err) throw err;

      // Instantiate a table object.
      productTable = new table({

         head: ['ID', 'Department', 'Overhead Cost', 'Product Sales', 'Total Profit'],
         colWidths: [5, 25, 15, 17, 17]
      });

      // load table
      res.forEach((r) => {

         let sales = parseFloat(r.sales).toFixed(2);
         let overhead = parseFloat(r.over_head_cost).toFixed(2);
         let profit = (sales - overhead).toFixed(2);

         productTable.push([r.id, r.department_name, overhead, sales, profit]);
      });

      // Print table.
      console.log(productTable.toString());

      //Disconnect from the database.
      connection.end();

   });
} // printSubervisorTable()

function createNewDepartment() {

   inquirer.prompt([{
      type: "input",
      name: "department",
      message: "Department name?"
   }, {
      type: "input",
      name: "overhead",
      message: "Overhead Cost?",
   }]).then(function (answer) {

      // Insert new department into the products table.
      let connection = mysql.createConnection({
         host: "localhost",
         port: 3306,
         user: "root",
         password: process.env.SQL_PASSWORD,
         database: "bamazon_db"
      });

      connection.query(
         "INSERT INTO departments SET ?", {
            department_name: answer.department,
            over_head_cost: answer.overhead,
         },
         function (err) {
            if (err) throw err;
            console.log(`${answer.department} was added successfully!`);
         }
      );

      // Disconnect from the database.
      connection.end();
   });

} // createNewDepartment()