var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
   host: "localhost",
   port: 3306,
   user: "root",
   password: process.env.SQL_PASSWORD,
   database: "products_db"
});

connection.connect(function (err) {
   if (err) throw err;
   console.log("connected as id " + connection.threadId + "\n");
   supervisorView(); // put start() here so nothing happens until connection success
});

/* -----------------------------------------------------------------------
// SUPERVISOR VIEW
/* -----------------------------------------------------------------------
1) Create a new MySQL table called departments.Your table should include the following columns:
   - department_id
   - department_name
   - over_head_costs(A dummy number you set for each department)

2) Modify the products table so that there 's a product_sales column, and modify your bamazonCustomer.js app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.
4) Make sure your app still updates the inventory listed in the products column.

5) Create another Node app called bamazonSupervisor.js.Running this application will list a set of menu options:
   - View Product Sales by Department
   - Create New Department

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