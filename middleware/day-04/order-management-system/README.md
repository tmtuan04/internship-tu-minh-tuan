# 🛒 Order Management System

A backend RESTful API system for managing users, products, and orders. Built with Node.js, Express.js, MySQL, and secured using JWT authentication.

## 📌 API Document

**Postman**: https://interstellar-equinox-502232.postman.co/workspace/API~5a88b07a-3277-4b87-8a49-202afd35bfb4/collection/37042576-f06169fe-efd6-46e7-b202-1e444ac9ab67?action=share&creator=37042576

## ▶️ How to Run

1. Clone the repository
2. `npm install`
3. Create `.env` file
```
PORT=

DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=

JWT_SECRET=
```
4. Import Database (MySQL): Use the provided `database.sql` file
5. Seed data: `node seed.js`
6. `npm start`

## 📌 Features

### 1. Authentication
- **Register**: Register with `name`, `email`, `password`
- **Login**: Authenticate using `email` & `password`
- **JWT protected routes**
- **Passwords are hashed** using `bcrypt`

### 2. User Management (Admin only)
- **List all users**
- **Lock/unlock account**

### 3. Product Management
- **List all products**
- **Create product**
- **Update product**
- **Delete product**
- **Validation** on input data

### 4. Order Management
- **Create new order**
- **View user orders**
- **Admin view all orders**
- **Update order status**
- **Auto-decrease stock**

### 5. Middleware & Error Handling
- JWT Authentication middleware
- Role-based Authorization middleware
- Input validation middleware
- Global error handler

### 6. Logging
- All requests logged using `Morgan`
- Error logs printed to console
