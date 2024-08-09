import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const seedData = async () => {
  try {
    // Create users
    const users = await prisma.user.createMany({
      data: [
        {
          username: "johndoe",
          name: "John Doe",
          email: "johndoe@example.com",
          password: await bcrypt.hash("password123", 10),
        },
        {
          username: "janesmith",
          name: "Jane Smith",
          email: "janesmith@example.com",
          password: await bcrypt.hash("password456", 10),
        },
        {
          username: "admin",
          name: "Admin",
          email: "admin@example.com",
          password: await bcrypt.hash("adminpassword", 10),
          role: "admin",
        },
      ],
    });
    console.log(`Created ${users.count} users.`);

    // Create categories
    const categories = await prisma.category.createMany({
      data: [
        { category_name: "Electronics" },
        { category_name: "Clothing", parent_id: 1 },
        { category_name: "Furniture", parent_id: 1 },
        { category_name: "Books" },
        { category_name: "Toys", parent_id: 1 },
      ],
    });
    console.log(`Created ${categories.count} categories.`);

    // Create products
    const products = await prisma.product.createMany({
      data: [
        {
          name: "Apple iPhone 13",
          description: "The latest iPhone model",
          price: 799.99,
          category_id: 2,
          user_id: 1,
          category_name: "Clothing",
        },
        {
          name: "Leather Sofa",
          description: "A comfortable leather sofa",
          price: 999.99,
          category_id: 3,
          user_id: 2,
          category_name: "Furniture",
        },
        {
          name: "The Great Gatsby",
          description: "A classic American novel",
          price: 12.99,
          category_id: 4,
          user_id: 1,
          category_name: "Books",
        },
        {
          name: "LEGO Star Wars Millennium Falcon",
          description: "A buildable LEGO set",
          price: 149.99,
          category_id: 5,
          user_id: 2,
          category_name: "Toys",
        },
      ],
    });
    console.log(`Created ${products.count} products.`);

    // Create wishlists
    const wishlists = await prisma.wishList.createMany({
      data: [
        {
          user_id: 1,
          product_id: 1,
          product_name: "Apple iPhone 13",
        },
        {
          user_id: 1,
          product_id: 3,
          product_name: "The Great Gatsby",
        },
        {
          user_id: 2,
          product_id: 2,
          product_name: "Leather Sofa",
        },
        {
          user_id: 2,
          product_id: 4,
          product_name: "LEGO Star Wars Millennium Falcon",
        },
      ],
    });
    console.log(`Created ${wishlists.count} wishlists.`);

    console.log("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await prisma.$disconnect();
  }
};

seedData();
