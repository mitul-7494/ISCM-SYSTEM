# System Architecture

The Integrated Sales and Customer Management System is built using Node.js and follows a modular structure. The application includes controllers, models, views (pages), and static assets.

## Directory Structure

- **index.js**: The entry point of the application.
- **package.json, package-lock.json**: Node.js package configuration files.
- **README.md**: Documentation for the project.
- **controll/**: Controllers responsible for handling different aspects of the application.
- **doc/**: Documentation folder.
- **model/**: Models representing the data structure, defining the **Schemas** and business logic of the application.
- **pages/**: EJS templates for rendering HTML pages.
- **public/**: Static assets like JavaScript files.

## Components

### 1. Entry Point (index.js)

- Initializes the Express application.
- Configures middleware and routes.

### 2. Controllers (controll/)

- **cart.js**: Manages cart-related operations.
- **extras.js**: Additional functionalities.
- **login.js**: Handles user authentication and login.
- **mail.js**: Responsible for email-related functionalities.
- **pages.js**: Controls rendering of different pages.
- **register.js**: Handles user registration.
- **router.js**: Defines routes and connects them to corresponding controllers.
- **sales.js**: Manages sales-related operations.

### 3. Models (model/)

- **admin.js**: Represents the admin data model.
- **cart.js**: Represents the cart data model.
- **customer.js**: Represents the customer data model.
- **customerdetail.js**: Represents detailed customer information.
- **items.js**: Represents the item data model.
- **order.js**: Represents the order data model.
- **sales.js**: Represents sales-related data.

### 4. Views (pages/)

- **admin.ejs**: Admin page template.
- **cart.ejs**: Cart page template.
- **items.ejs**: Items page template.
- **loginform.ejs**: Login form template.
- **order.ejs**: Order page template.
- **orders.ejs**: Orders page template.
- **sorders.ejs**: Sales orders page template.

### 5. Static Assets (public/)

- **cartsupport.js**: JavaScript file for cart-related support.
- **salessupport.js**: JavaScript file for sales-related support.

## Application Flow

1. **User Interaction:**
   - Users interact with the application through the provided views (EJS templates).
   - Requests are sent to the server for processing.

2. **Server Processing:**
   - The server, implemented using Express, processes incoming requests.
   - Requests are routed to the appropriate controller based on defined routes.

3. **Controller Logic:**
   - Controllers contain logic for handling specific functionalities (e.g., cart management, order processing).

4. **Model Interaction:**
   - Controllers interact with models to perform CRUD operations on data (e.g., interacting with the database).

5. **View Rendering:**
   - Rendered views are sent back to the client for display.

6. **Static Assets:**
   - Static assets (JavaScript files) in the `public` folder enhance client-side functionality.

## Dependencies

- Express: Web application framework for Node.js.
- EJS: Templating engine for rendering views.

## Setup and Usage

Refer to the `README.md` file for instructions on setting up and running the application.