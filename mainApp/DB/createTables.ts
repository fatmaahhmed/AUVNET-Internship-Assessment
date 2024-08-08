import { Database } from "sqlite";
import { dbPromise } from "./database";

export const createTables = async () => {
  const db = await dbPromise;
  try {
    await db.exec(`PRAGMA foreign_keys = ON;`);
    console.log("Foreign key support enabled");

    // Create User table
    await db.exec(`CREATE TABLE IF NOT EXISTS User (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('admin', 'user')) DEFAULT 'user',
      token TEXT DEFAULT 'null'
    )`);

    // Create Category table
    await db.exec(`CREATE TABLE IF NOT EXISTS Category (
      category_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      parent_id INTEGER,
      FOREIGN KEY (parent_id) REFERENCES Category(category_id)
    )`);

    // Create Product table
    await db.exec(`CREATE TABLE IF NOT EXISTS Product (
      product_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      description TEXT,
      price REAL NOT NULL,
      category_id INTEGER,
      user_id INTEGER,
      FOREIGN KEY (category_id) REFERENCES Category(category_id),
      FOREIGN KEY (user_id) REFERENCES User(user_id)
    )`);

    // Create WishList table
    await db.exec(`CREATE TABLE IF NOT EXISTS WishList (
      wishlist_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      product_name TEXT,
      FOREIGN KEY (user_id) REFERENCES User(user_id),
      FOREIGN KEY (product_name) REFERENCES Product(name)
    )`);

    console.log("Tables created successfully");
  } catch (err) {
    console.error("Error creating tables:", err);
  }
};
