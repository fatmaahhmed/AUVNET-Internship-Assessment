# E-Commerce Application Development Guide

## Overview

This guide outlines the development of a simple E-Commerce application with basic functionalities, focusing on backend skills and minimal frontend design. The application will support two roles: Admin and User, with robust authentication, authorization, and validation mechanisms.

## Technology Stack

### Backend

- **Server-side**: Node.js with Express.js
- **Database**:sqlite3
- **ORM**: Prisma (for SQL)

### Frontend

- **Framework**: React.js

## Database Design

### ERD Model

# E-Commerce Application ERD Documentation

## Overview

This document provides the Entity-Relationship Diagram (ERD) for the E-Commerce application. It outlines the tables, their attributes, and the relationships between them. The application includes entities such as User, Category, Product, and WishList.

## Tables and Relationships

### Table: User

| Column     | Type    | Constraints                       |
|------------|---------|----------------------------------|
| `user_id`  | integer | Primary Key, Auto Increment       |
| `username` | text    | Not Null, Unique                  |
| `name`     | text    | Not Null                           |
| `email`    | text    | Not Null, Unique                  |
| `password` | text    | Not Null                           |
| `role`     | text    | Not Null, Default: 'user'         |
| `token`    | text    | Default: ''                        |

### Table: Category

| Column          | Type    | Constraints                   |
|-----------------|---------|------------------------------|
| `category_id`   | integer | Primary Key, Auto Increment  |
| `category_name` | text    | Not Null, Unique             |
| `parent_id`     | integer | Optional                      |

### Table: Product

| Column         | Type    | Constraints                      |
|----------------|---------|---------------------------------|
| `product_id`   | integer | Primary Key, Auto Increment      |
| `name`         | text    | Not Null, Unique                |
| `description`  | text    | Optional                         |
| `price`        | real    | Not Null                         |
| `category_id`  | integer | Foreign Key                      |
| `user_id`      | integer | Foreign Key                      |

### Table: WishList

| Column        | Type    | Constraints                      |
|---------------|---------|---------------------------------|
| `wishlist_id` | integer | Primary Key, Auto Increment      |
| `user_id`     | integer | Foreign Key                      |
| `product_id`  | integer | Foreign Key                      |
| `product_name`| text    | Not Null                         |

## Relationships

- **User** to **Product**: One-to-Many
  - `User(user_id) < Product(user_id)`

- **Category** to **Product**: One-to-Many
  - `Category(category_id) < Product(category_id)`

- **Category** self-referencing: One-to-Many
  - `Category(category_id) < Category(parent_id)`

- **User** to **WishList**: One-to-Many
  - `User(user_id) < WishList(user_id)`

- **Product** to **WishList**: One-to-Many
  - `Product(product_id) < WishList(product_id)`

- **WishList** Composite Key: Unique
  - `(product_id, user_id) < WishList(product_id, user_id)`

## Diagram

<img width="1046" alt="image" src="https://github.com/user-attachments/assets/db718d91-71b9-4cb6-ba53-aee0722c8363">


## Notes


- The ERD provides a high-level overview of the database schema. Additional details may be required for full implementation.

---



### Categories

A three-level depth relationship will be implemented using a self-referencing table/collection for categories.

## Authentication and Authorization

- **JWT (JSON Web Tokens)**: For handling authentication and authorization.
- **Middleware**: Middleware will be created to check roles (Admin, User) and validate tokens.

## API Endpoints

### User Services

- `POST /signup`
- `POST /login`
- `GET /products`, `POST /products`, `PUT /products/:id`, `DELETE /products/:id`
- `GET /wishlist`, `POST /wishlist`, `DELETE /wishlist/:id`

### Admin Services

- `POST /admin/login`
- `GET /admin`, `POST /admin`, `PUT /admin/:id`, `DELETE /admin/:id`
- `GET /users`, `DELETE /users/:id`
- `GET /products`, `DELETE /products/:id`
- `GET /categories`, `POST /categories`, `PUT /categories/:id`, `DELETE /categories/:id`

### Pagination

Pagination will be implemented for all GET requests to handle large datasets efficiently.


## Implementation Steps

1. **Setup Backend**:

   - Initialize Node.js project with Express.
   - Setup database connection using Prisma or Mongoose.
   - Define models and relationships.
   - Implement authentication and authorization.
   - Develop API endpoints.

2. **Setup Frontend**:

   - Initialize React.js project.
   - Create necessary components for user and admin interfaces.
   - Integrate with backend iAPIs.

