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
            viewSalesByDepartment();
            break;
         case "Create New Department":
            insertNewDepartment();
            break;
         default:
            console.log("Oops! Invalid option.");
            break;
      }
   });
}

function viewSalesByDepartment() {

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
   let sqlCommand = `SELECT department_name, SUM(product_sales) AS amount
         FROM products
         INNER JOIN departments USING (department_name)
         GROUP BY department_name;`

   connection.query(sqlCommand, function (err, res) {
      if (err) throw err;

      // Instantiate a table object.
      let productTable = new table({

         head: ['ID', 'Department', 'Overhead Cost', 'Product Sales', 'Total Profit'],
         colWidths: [5, 25, 15, 17, 17]
      });

      // load table
      res.forEach((r) => {

         console.log(r);
         let sales = parseFloat(r.amount).toFixed(2);
         let profit = (parseFloat(r.overhead_cost) - sales).toFixed(2);
         productTable.push([r.id, r.department_name, `$${r.overhead_cost}`, `$${sales}`, `$${profit}`]);
      });

      // Print table.
      console.log(productTable.toString());

      //Disconnect from the database.
      connection.end();

   });
}

function insertNewDepartment() {

   console.log("Create new department");

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

} // insertNewDepartment()

/* -----------------------------------------------------------------------
// SUPERVISOR VIEW
/* -----------------------------------------------------------------------

6) When a supervisor selects View Product Sales by Department, the app should display a summarized table in their terminal / bash window. Use the table below as a guide.

   department_id  department_name   over_head_costs   product_sales  total_profit
   01             Electronics       10000             20000          10000
   02             Clothing          60000             100000         40000

7) The total_profit column should be calculated on the fly using the difference between over_head_costs and product_sales.total_profit should not be stored in any database.You should use a custom alias.
If you can 't get the table to display properly after a few hours, then feel free to go back and just add total_profit to the departments table.

Hint: You may need to look into aliases in MySQL.
Hint: You may need to look into GROUP BYs.
Hint: You may need to look into JOINS.
HINT: There may be an NPM package that can log the table to the console.What 's is it? Good question :)

----------------------------------------------------------------------- */