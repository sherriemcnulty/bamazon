# bamazon

<a href="https://drive.google.com/file/d/1GSwrcGbPyM41ajKi4qkIaxJlbYyOd6ns/view?usp=sharing">Video Demo</a>

Bamazon is an Amazon-like storefront that demonstrates MySQL skills. The app has three views: a Customer View, Manager View and Supervisor View.

##Customer View

The Customer View lets customers place orders. The screen displays the entire inventory in table format and prompts for the product ID and quantity for their order. A confirmation message is displayed when order has been successfully added. Here you can see that the customer ordered 996 of the book listed as item 1, "Life and Death of a Druid Prince."

Once the order has been placed, a confirmation is displayed if the order was successful.

![Available products displayed in a table with the customer's order and confirmation below the table](/images/customer1.jpg)

Otherwise, the customer will see a message letting them know there aren't enough to fill their order.

![Message that says, "Sorry. We do not have enough in stock to fill your order."](/images/customer2.jpg)

##Manager View

The Manager View enables managers to view products for sale, view low inventory, add more of an existing item or add a new item.

![Menu of Options](/images/manager1.jpg)

"View products for sale" shows the entire inventory in a table which is the same as the customer's view of what is available. This table shows the customer's order, above, was deleted from the 1000 copies of "Life and Death of a Druid Prince" that was originally in stock. 

![Inventory table](/images/manager2.jpg)

"View Low Inventory" shows only items that have 5 or less units remaining. 

![Low inventory table](/images/manager3.jpg)

"Add more of an existing item" prompts the manager for Product Id and Quantity then displays confirmation of success.

![Prompts](/images/manager4.jpg)

The table below shows the manager added 1000 copies of "Life And Death Of A Druid Prince." 

![Inventory table](/images/manager5.jpg)

"Add a new item" enables the manager to add a new item to the inventory. It prompts for the product name, department, price and quantity. Confirmation is displayed when the item has been added to the inventory.

![Add a new item prompts](/images/manager6.jpg)

Here you can see the manager's addition of 150 units of Nails was added to the inventory as the 11th item on the list.

![Inventory table](/images/manager7.jpg)

##Supervisor View

The supervisor's option menu enables them to view product sales by department or create a new department. 

![Option menu](/images/supervisor1.jpg)

"View Product Sales by Department" displays a summary of over head costs, total sales and profits for each department.

![Table of department information](/images/supervisor2.jpg)

"Create New Department" asks for the name and overhead cost  of the department that is being added.

![Prompts](/images/supervisor3.jpg)

The table below shows that the new department was added.

![Table](/images/supervisor4.jpg)








