import bcrypt from "bcrypt";
import { dbPromise } from "../../database";

// Adjust the path according to your project structure

export const seedData = async () => {
  const db = await dbPromise;

  try {
    const adminPassword = await bcrypt.hash("admin", 10);
    const userPassword = await bcrypt.hash("password123", 10);

    // Seed User table
    await db.exec(`INSERT INTO User (username, name, email, password, role) VALUES
      ('admin', 'Admin User', 'admin@example.com', '${adminPassword}', 'admin'),
      ('user1', 'Regular User 1', 'user1@example.com', '${userPassword}', 'user'),
      ('user2', 'Regular User 2', 'user2@example.com', '${userPassword}', 'user')
    `);

    // Seed Category table
    await db.exec(`INSERT INTO Category (name, parent_id) VALUES
      ('Computers', NULL),
      ('Processors', 1),
      ('RAM', 1),
      ('AMD', 2),
      ('Intel', 2)
    `);

    // Seed Product table
    await db.exec(`INSERT INTO Product (name, description, price, category_id, user_id) VALUES
      ('AMD Ryzen 5', '6-core, 12-thread processor', 199.99, 4, 2),
      ('Intel Core i5', '4-core, 8-thread processor', 229.99, 5, 3),
      ('Corsair Vengeance RAM', '16GB (2x8GB) DDR4 RAM', 79.99, 3, 2)
    `);

    // Seed WishList table with product names instead of product IDs
    await db.exec(`INSERT INTO WishList (user_id, product_name) VALUES
      (2, 'AMD Ryzen 5'),
      (3, 'Intel Core i5')
    `);

    console.log("Seed data inserted successfully");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};
