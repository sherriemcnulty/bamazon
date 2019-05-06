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
            createNewDepartment();
            break;
         default:
            console.log("Oops! Invalid option.");
            break;
      }
   });
}

function viewSalesByDepartment() {

   console.log("View sales by department.");
}

function createNewDepartment() {

   console.log("Create new department");
}

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