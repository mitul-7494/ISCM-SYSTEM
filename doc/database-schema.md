# Database Schema

since app is based on Nodejs, mongodb atlas database should be an obvious choice. for creating schemas mongoose is used. 

## Admin Schema

- **username** (String): Unique identifier for the admin.
- **password** (String): Password for admin authentication.

## Cart Schema

- **username** (String): Identifier for the user associated with the cart.
- **title** (String): Title of the item in the cart.
- **price** (Number): Price of the item.
- **id** (Number): Unique identifier for the item.
- **quantity** (Number): Quantity of the item in the cart.
- **email** (String): User's email.

## Customer Schema

- **username** (String): Unique identifier for the customer.
- **password** (String): Customer's password.
- **balance** (Number): Customer's account balance.

## Customer Details Schema

- **username** (String): Unique identifier for the customer.
- **email** (String): Customer's email address (validated).
- **phone** (String): Customer's phone number (validated).

## Item Schema

- **id** (Number): Unique identifier for the item.
- **title** (String): Title of the item.
- **price** (Number): Price of the item.
- **thumbnail** (String): URL of the item's thumbnail image.

## Order Schema

- **username** (String): Identifier for the user placing the order.
- **orderlist** (Array): List of items in the order.
- **cartvalue** (Number): Total value of the items in the order.
- **date** (Date): Date and time of the order.
- **status** (String): Order status (default: "Pending").
- **approvedby** (String): Admin username who approved the order.
- **email** (String): User's email.

## Sales Schema

- **username** (String): Unique identifier for the sales employee.
- **password** (String): Password for sales employee authentication.

---

**Note:**

- Additional validations and constraints is implemented in the actual JavaScript code, which is not mentioned here.