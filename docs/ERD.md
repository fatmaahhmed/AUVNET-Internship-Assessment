# ERD

## Storage

### Schema

**Roles**

- `role_id` (PK, INT, AUTO_INCREMENT)
- `role_name` (ENUM: 'Admin' | 'User')

**Users**

- `user_id` (PK, INT, AUTO_INCREMENT)
- `username` (VARCHAR(255), UNIQUE)
- `email` (VARCHAR(255), UNIQUE)
- `password` (VARCHAR(255))
- `role_id` (FK to Roles.role_id, INT)

**Categories**

- `category_id` (PK, INT, AUTO_INCREMENT)
- `category_name` (VARCHAR(255))
- `parent_id` (FK to Categories.category_id, INT, nullable)

**Products**

- `product_id` (PK, INT, AUTO_INCREMENT)
- `product_name` (VARCHAR(255))
- `user_id` (FK to Users.user_id, INT)
- `category_id` (FK to Categories.category_id, INT)
- `price` (DECIMAL(10, 2))
- `description` (TEXT, nullable)

**WishList**

- `wishlist_id` (PK, INT, AUTO_INCREMENT)
- `user_id` (FK to Users.user_id, INT)
- `product_id` (FK to Products.product_id, INT)

## Server

### Auth

- **User Authentication**: Implement JWT or OAuth for user authentication.
- **Role-based Authorization**: Ensure access control based on roles (Admin, User).
- **Admin Authentication**: Default credentials for admin login (username: `admin`, password: `admin`).

### API

**Auth**:

- `POST /auth/signup`: User sign-up
- `POST /auth/login`: User login (username, password)
- `POST /auth/admin-login`: Admin login (default credentials)

**Products**:

- `GET /products`: View all products (paginated)
- `POST /products`: Add a new product (User only)
- `PUT /products/:id`: Update a product (User only, own products)
- `DELETE /products/:id`: Delete a product (User only, own products)
- `GET /products/:id`: View a specific product

**WishList**:

- `GET /wishlist`: View user's wishlist (paginated)
- `POST /wishlist`: Add a product to wishlist
- `DELETE /wishlist/:productId`: Remove a product from wishlist

**Admins**:

- `GET /admins`: View all admins (paginated)
- `POST /admins`: Create a new admin
- `PUT /admins/:id`: Update an admin
- `DELETE /admins/:id`: Delete an admin

**Users**:

- `GET /users`: View all users (paginated)
- `DELETE /users/:id`: Delete a user

**Categories**:

- `GET /categories`: View all categories (paginated)
- `POST /categories`: Add a new category
- `PUT /categories/:id`: Update a category
- `DELETE /categories/:id`: Delete a category

## Clients

- **Frontend**: Minimal UI to interact with API, focusing on backend functionality.
- **Mobile**: If applicable, integrate with mobile app using the same API endpoints.

## Hosting

- **Server Hosting**: Use cloud providers like AWS, Azure, or Heroku for deploying the server.
- **Database Hosting**: Use managed database services like AWS RDS, Azure SQL Database, or other cloud-based databases.
