 # Integrated Sales and Customer Management System
 
**_NOTE:_**
deployment completed at diffrent branch but main branch contain invoice sending with puppeteer which is harder to deploy, another way is that direct internally pass the ejs page and convert into invoice pdf
by html-pdf used in branch (qwertyuiop)[https://github.com/mitul-7494/ISCM-SYSTEM/tree/qwertyuiop] check out (deployment)[https://iscm-system.onrender.com/login] customer side
id:-guest
pass:-customer

## Project Overview

The Integrated Sales and Customer Management System is designed to streamline and enhance the sales process within a company. It provides a comprehensive platform for managing company employees, sales representatives, and customers. The system includes features such as item, sales employee, and customer masters, an intuitive order management process, and detailed reporting capabilities for data-driven decision-making.

## Key Features

### User Management

- Administrative module for creating and managing sales employees and customers.
- Specific roles and permissions tailored to each user type.

### Master Databases

- Item Master to catalog and manage details of all products available for sale.
- Customer and Sales Employee Masters to store comprehensive information about each customer and sales representative.

### Order Processing

- User-friendly order screen for customers to place orders.
- Intelligent fetching of customer details from the Customer Master.
- Form validations to ensure correctness and completeness of customer-entered information.

### Account Balance

- Management of customer account balance.
- Initial entry by admin during customer registration.
- Balance calculation and notifications to customers when it falls under a certain amount.

### Approval Workflow

- Orders sent to the sales employee panel for review and approval.
- Sales employees can approve or reject orders, triggering automatic status updates.

### Email Notifications

- Automated email notifications to customers upon placing an order.
- Notifications to sales employees for order approval and changes in order status.

### Invoices

- Automated invoice generation sent to customers via email (PDF).
- Invoices visible to Admin and sales employees in the listing of order history and reports.

### Reporting and Analytics

- Comprehensive reports:
  - Item-wise sales reports
  - Customer-wise sales reports
  - Date-wise sales reports
  - Yearly/monthly sales summaries
- Visually intuitive dashboard with charts for at-a-glance insights into sales performance.

### Security and Data Integrity

  #### Validation and Data Integrity

  - Incorporation of data validation and verification mechanisms to maintain data integrity.
    - Implement validation checks for necessary fields to ensure data accuracy and completeness.

## Documentation

Thorough documentation is available in the [docs](./doc) folder, including:

- [System Architecture](./doc/system-architecture.md)
- [Database Schema](./doc/database-schema.md)

## Getting Started

Follow the steps below to get the Integrated Sales and Customer Management System project up and running locally.
**after fifteen deployment attempts, I'm going to hang it up for now.**

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Clone the Repository

```bash
git clone https://github.com/mitul-7494/ISCM-SYSTEM.git
```

### Get to that directory in command prompt

get all the dependencies
```bash
npm init
```

### Create one .env file containing variables

```bash
URI="mongodb connection uri"
HEX  |  npm i crypto then
HEXS |  node
HEXC |  > crypto.randomBytes(32).toString("HEX") diffrent for all 3
//have to create a app password by google refrence given below
USER="mail_id of app password is created"
PASS="app pass for above id"
```
generate app password [as given](https://www.febooti.com/products/automation-workshop/tutorials/enable-google-app-passwords-for-smtp.html)

### Run following command at root directory

```bash
npm start
```
create admin user by loging ui is given to add more sales and customer users.

### Voila
