# bamazon

https://drive.google.com/file/d/1GSwrcGbPyM41ajKi4qkIaxJlbYyOd6ns/view?usp=sharing


In this activity, you'll be creating an Amazon-like storefront with the MySQL skills you learned this unit. The app will take in orders from customers and deplete stock from the store's inventory. As a bonus task, you can program your app to track product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.

Bamazon is an Amazon-like storefront that demonstrates MySQL skills. The app has three views: a Customer View, Manager View and Supervisor View.


*Customer View

**The Customer View lets customers place orders. The first screen displays the entire inventory in table format and prompts for the product ID and quantity for their order. Confirmation is displayed when order has been successfully added. Here you can see that the customer ordered 996 of the book listed as item 1, "Life and Death of a Druid Prince"

![Customer view with confirmation](/images/customer1.jpg)

Once the order has been placed, a confirmation is displayed. 


*Manager View

![Customer view with the message, "Sorry. We do not have enough in stock to fill your order."](/images/customer2.jpg)

The Manager View enables managers to (1) View products for sale (2) View low inventory (3) Add more of an existing item (4) Add a new item.

![Manager View - Menu of Options](/images/manager1.jpg)

"View products for sale" shows the entire inventory. You can see here that the customer's order was deleted from the inventory.

![Manager View - View prodcuts for sale](/images/manager2.jpg)

"View Low Inventory" shows only items that have less than 5 units left in stock.

![Manager View - View low inventory](/images/manager2.jpg)

"Add more of an existing item" prompts the manager for Product Id and Quantity then displays confirmation of success.

![Manager View - View low inventory](/images/manager3.jpg)

By viewing the inventory, you can see that it was added to the database.

![Manager View - Inventory table](/images/manager4.jpg)

"Add a new item" enables the manager to add a new item to the inventory. It prompts for the product name, department, price and quantity. Confirmation is displayed when the item has been added to the inventory.

![Manager View - Inventory table](/images/manager5.jpg)

Here you can see that it was added to the inventory.

![Manager View - Inventory table](/images/manager6.jpg)

*Supervisor View

Here we look at things at a departmental level. The supervisor has two menu options: (1) View Product Sales by Department and (2) Create a New Department. 

![Supervisor View - Menu options](/images/Supervisor1.jpg)

"View Product Sales by Department" displays the over head costs, total sales and profits for each department.

![Supervisor View - Table of department information](/images/Supervisor2.jpg)

"Create New Department" prompts for (1) Department Name and (2) Overhead cost.

![Supervisor View - Table of department information](/images/Supervisor3.jpg)

Now the manager can add products to the new department. 

![Manager View - Add new department prompts showing the new department](/images/Supervisor4.jpg)

Now we see an item being added to the new department

![Manager prompts showing the new department](/images/Supervisor5.jpg)

![Inventory table showing the new item in stock](/images/Supervisor6.jpg)

and to the supervisor table.

![Supervisor View showing the new department's cost, sales and profit](/images/Supervisor7.jpg)








