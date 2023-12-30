# Integrated Sales and Customer Management System

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

- Robust security measures to safeguard sensitive data and comply with data protection regulations.
  
  #### Encryption

  - Implementation of encryption for sensitive data, including customer details and password storage, using industry-standard encryption algorithms.

  #### Validation and Data Integrity

  - Incorporation of data validation and verification mechanisms to maintain data integrity.
    - Implement validation checks for necessary fields to ensure data accuracy and completeness.

## Documentation

Thorough documentation is available in the [docs](./docs) folder, including:

- [System Architecture](./docs/system-architecture.md)
- [Database Schema](./docs/database-schema.md)
- [User Manuals](./docs/user-manuals.md)

## Getting Started

Follow the steps below to get the project up and running locally.

1. Clone the repository:

   ```bash
   git clone https://github.com/mitul-7494/ISCM-SYSTEM.git
