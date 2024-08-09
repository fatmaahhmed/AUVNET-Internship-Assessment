import bcrypt from "bcrypt";
import { dbPromise } from "../../database"; // Adjust the path according to your project structure

export const seedData = async () => {
  const db = await dbPromise;
  try {
    //     await db.run(`INSERT INTO Product (name, description, price, category_id, user_id, category_name) VALUES
    //   ('Invalid Product', 'This product has an invalid category and user', 500.00, 999, 999, 'NonExistentCategory')
    // `);

    // Seed User table
    // await db.run(`INSERT INTO User (username, name, email, password, role) VALUES
    //   ('admin', 'Admin User', 'admin@example.com', 'password123', 'admin'),
    //   ('user1', 'User One', 'user1@example.com', 'password123', 'user'),
    //   ('user2', 'User Two', 'user2@example.com', 'password123', 'user'),
    //   ('user3', 'User Three', 'user3@example.com', 'password123', 'user'),
    //   ('user4', 'User Four', 'user4@example.com', 'password123', 'user'),
    //   ('user5', 'User Five', 'user5@example.com', 'password123', 'user'),
    //   ('user6', 'User Six', 'user6@example.com', 'password123', 'user'),
    //   ('user7', 'User Seven', 'user7@example.com', 'password123', 'user'),
    //   ('user8', 'User Eight', 'user8@example.com', 'password123', 'user'),
    //   ('user9', 'User Nine', 'user9@example.com', 'password123', 'user')
    // `);

    // Seed Category table
    // await db.run(`INSERT INTO Category (category_name, parent_id) VALUES
    //   ('Electronics', NULL),
    //   ('Laptops', 1),
    //   ('Smartphones', 1),
    //   ('Home Appliances', NULL),
    //   ('Kitchen Appliances', 4),
    //   ('Cameras', NULL),
    //   ('Headphones', 1),
    //   ('Furniture', NULL),
    //   ('Office Supplies', NULL),
    //   ('Books', NULL)
    // `);

    // Seed Product table
    // await db.run(`INSERT INTO Product (name, description, price, category_id, user_id, category_name) VALUES
    //   ('MacBook Pro', 'A high-performance laptop from Apple', 1299.99, 2, 11, 'Laptops'),
    // //   ('iPhone 13', 'Latest smartphone from Apple', 999.99, 3, 1, 'Smartphones'),
    // //   ('Dell XPS 13', 'A high-end laptop from Dell', 1199.99, 2, 2, 'Laptops'),
    // //   ('Samsung Galaxy S21', 'High-end smartphone from Samsung', 899.99, 3, 3, 'Smartphones'),
    // //   ('Ninja Blender', 'High-performance blender for kitchen', 149.99, 5, 4, 'Kitchen Appliances'),
    // //   ('Sony Alpha', 'A mirrorless camera from Sony', 1299.99, 6, 5, 'Cameras'),
    // //   ('Bose Headphones', 'Noise-cancelling headphones', 299.99, 7, 6, 'Headphones'),
    // //   ('IKEA Chair', 'Comfortable office chair', 89.99, 8, 7, 'Furniture'),
    // //   ('Staples Paper', 'Ream of printer paper', 12.99, 9, 8, 'Office Supplies'),
    // //   ('Harry Potter', 'Fantasy novel by J.K. Rowling', 9.99, 10, 9, 'Books')
    // `);

    // Seed WishList table
    // await db.run(`INSERT INTO WishList (user_id, product_name, product_id) VALUES
    //   (1, 'MacBook Pro', 1),
    //   (2, 'iPhone 13', 2),
    //   (3, 'Dell XPS 13', 3),
    //   (4, 'Samsung Galaxy S21', 4),
    //   (5, 'Ninja Blender', 5),
    //   (6, 'Sony Alpha', 6),
    //   (7, 'Bose Headphones', 7),
    //   (8, 'IKEA Chair', 8),
    //   (9, 'Staples Paper', 9),
    //   (10, 'Harry Potter', 10)
    // `);

    console.log("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};
