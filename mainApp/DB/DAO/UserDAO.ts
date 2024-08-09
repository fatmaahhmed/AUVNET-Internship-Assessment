// import {
//   CreateUserRequest,
//   Product,
//   UpdateUserRequest,
//   User,
// } from "../sql/models/types";

// import { UserDao } from "./UserInterface";
// import bcrypt from "bcrypt";
// import { dbPromise } from "../database";
// import generateAuthToken from "../../middlewares/auth";

// const saltRounds = 10; // Number of salt rounds for bcrypt

// export class UserImpl implements UserDao {
//   async createWishlist(user_id: number, product_name: string): Promise<void> {
//     const db = await dbPromise;
//     try {
//       await db.run(
//         "INSERT INTO WishList (user_id, product_name) VALUES (?, ?)",
//         user_id,
//         product_name
//       );
//     } catch (error) {
//       console.error("Failed to add product to wishlist:", error);
//       throw new Error("Failed to add product to wishlist");
//     }
//   }
//   // async getWishlistByUserId(
//   //   userId: number,
//   //   page: number,
//   //   pageSize: number
//   // ): Promise<PaginatedResponse<Product>> {
//   //   const db = await dbPromise;
//   //   const offset = (page - 1) * pageSize;
//   //   const products = await db.all<Product[]>(
//   //     "SELECT p.* FROM Products p INNER JOIN Wishlist w ON p.id = w.productId WHERE w.userId = ? LIMIT ? OFFSET ?",
//   //     userId,
//   //     pageSize,
//   //     offset
//   //   );
//   //   const totalCount = await db.get<{ count: number }>(
//   //     "SELECT COUNT(*) as count FROM WishList WHERE userId = ?",
//   //     userId
//   //   );
//   //   return {
//   //     data: products,
//   //     page,
//   //     pageSize,
//   //     total: totalCount?.count || 0,
//   //   };
//   // }
//   async deleteUser(userId: number): Promise<void> {
//     const db = await dbPromise;
//     // Check if the user exists
//     const user = await db.get("SELECT * FROM User WHERE user_id = ?", userId);
//     if (!user) {
//       throw new Error(`User with ID ${userId} does not exist.`);
//     }
//     // Delete the user if they exist
//     await db.run("DELETE FROM User WHERE user_id = ?", userId);
//   }
//   async deleteWishlistItem(
//     user_id: number,
//     product_name: string
//   ): Promise<void> {
//     const db = await dbPromise;
//     try {
//       console.log(product_name);
//       const result = await db.run(
//         "DELETE FROM Wishlist WHERE user_id = ? AND product_name = ?",
//         user_id,
//         product_name
//       );

//       // Check if any rows were affected
//       if (result.changes === 0) {
//         console.warn(
//           `No wishlist item found for user_id ${user_id} and product_name ${product_name}`
//         );
//         throw new Error(
//           `Wishlist item not found for user_id ${user_id} and product_name ${product_name}`
//         );
//       }
//     } catch (error) {
//       console.error("Failed to delete wishlist item:", error);
//       throw new Error("Failed to delete wishlist item");
//     }
//   }

//   addProduct(product: Product): Promise<Product> {
//     throw new Error("Method not implemented.");
//   }
//   // viewProducts(
//   //   userId: number,
//   //   page: number,
//   //   pageSize: number
//   // ): Promise<PaginatedResponse<Product>> {
//   //   throw new Error("Method not implemented.");
//   // }
//   updateProduct(
//     productId: number,
//     updateData: Partial<Product>
//   ): Promise<Product> {
//     throw new Error("Method not implemented.");
//   }
//   deleteProduct(productId: number): Promise<void> {
//     throw new Error("Method not implemented.");
//   }
//   // async viewProducts(userId: number) {
//   //   const db = await dbPromise;
//   //   const query = "SELECT * FROM Product WHERE user_id = ?";
//   //   return await this.db.all(query, [userId]);
//   // }
//   async getUserByEmail(email: string): Promise<User | null> {
//     const db = await dbPromise;
//     const user = await db.get<User>("SELECT * FROM User WHERE email =?", email);
//     return user || null;
//   }

//   // async getAllUsers(
//   //   page: number,
//   //   pageSize: number
//   // ): Promise<PaginatedResponse<User>> {
//   //   const db = await dbPromise;
//   //   const offset = (page - 1) * pageSize;

//   //   const users = await db.all<User[]>(
//   //     "SELECT * FROM User LIMIT ? OFFSET ?",
//   //     pageSize,
//   //     offset
//   //   );
//   //   const totalCount = await db.get<{ count: number }>(
//   //     "SELECT COUNT(*) as count FROM User"
//   //   );

//   //   return {
//   //     data: users,
//   //     page,
//   //     pageSize,
//   //     total: totalCount?.count || 0,
//   //   };
//   // }
//   // View all users
//   // async getAllUsers() {
//   //   const db = await dbPromise;
//   //   const query = "SELECT * FROM User";
//   //   return await this.db.all(query);
//   // }

//   async createUser(user: CreateUserRequest): Promise<User> {
//     if (!user.username || !user.email || !user.password || !user.name) {
//       throw new Error(
//         "Missing required fields: username, email, password, role_id"
//       );
//     }
//     if (await this.getUserByEmail(user.email)) {
//       throw new Error("Email already exists");
//     }
//     const hashedPassword = await bcrypt.hash(user.password, saltRounds);

//     const db = await dbPromise;
//     const token = generateAuthToken({
//       name: user.name,
//       email: user.email,
//       role: user.role,
//     });
//     const result = await db.run(
//       "INSERT INTO User (username, name, email, password,token) VALUES (?, ?, ?, ?,?)",
//       user.username,
//       user.name,
//       user.email,

//       hashedPassword,
//       token
//     );
//     const createdUser: User = {
//       username: user.username,
//       name: user.name,
//       email: user.email,
//       password: hashedPassword,
//       token,
//     };

//     return createdUser;
//   }

//   async updateUser(
//     userId: number,
//     updateData: UpdateUserRequest
//   ): Promise<User> {
//     const db = await dbPromise;
//     const setClause = Object.keys(updateData)
//       .map((key) => `${key} = ?`)
//       .join(", ");
//     const values = Object.values(updateData);

//     await db.run(
//       `UPDATE User SET ${setClause} WHERE user_id = ?`,
//       ...values,
//       userId
//     );
//     const updatedUser = await this.getUserById(userId);
//     if (!updatedUser) {
//       throw new Error("User not found after update");
//     }

//     return updatedUser;
//   }
//   // View user's products
// }
import {
  CreateUserRequest,
  Product,
  UpdateUserRequest,
  User,
} from "../sql/models/types";

import { PrismaClient } from "@prisma/client"; // Import PrismaClient
import { UserDao } from "./UserInterface";
import bcrypt from "bcrypt";
import generateAuthToken from "../../middlewares/auth";

const saltRounds = 10; // Number of salt rounds for bcrypt

const prisma = new PrismaClient(); // Initialize PrismaClient

export class UserImpl implements UserDao {
  async deleteUser(userId: number): Promise<void> {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { user_id: userId }, // Use the correct field name
    });
    if (!user) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }
    // Delete the user if they exist
    await prisma.user.delete({
      where: { user_id: userId }, // Use the correct field name
    });
  }

  async deleteWishlistItem(
    user_id: number,
    product_name: string
  ): Promise<void> {
    try {
      const result = await prisma.wishList.deleteMany({
        where: {
          user_id: user_id,
        },
      });

      // Check if any rows were affected
      if (result.count === 0) {
        console.warn(
          `No wishlist item found for user_id ${user_id} and product_name ${product_name}`
        );
        throw new Error(
          `Wishlist item not found for user_id ${user_id} and product_name ${product_name}`
        );
      }
    } catch (error) {
      console.error("Failed to delete wishlist item:", error);
      throw new Error("Failed to delete wishlist item");
    }
  }

  addProduct(product: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }

  updateProduct(
    productId: number,
    updateData: Partial<Product>
  ): Promise<Product> {
    throw new Error("Method not implemented.");
  }

  deleteProduct(productId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async getUserById(userId: number): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { user_id: userId }, // Use the correct field name
    });
  }

  async createUser(user: CreateUserRequest): Promise<User> {
    if (!user.username || !user.email || !user.password || !user.name) {
      throw new Error(
        "Missing required fields: username, email, password, role_id"
      );
    }
    if (await this.getUserByEmail(user.email)) {
      throw new Error("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    const token = generateAuthToken({
      name: user.name,
      email: user.email,
      role: user.role,
    });

    const createdUser = await prisma.user.create({
      data: {
        username: user.username,
        name: user.name,
        email: user.email,
        password: hashedPassword,
        token,
      },
    });

    return createdUser;
  }

  async updateUser(
    userId: number,
    updateData: UpdateUserRequest
  ): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: { user_id: userId }, // Use the correct field name
      data: updateData,
    });

    return updatedUser;
  }
}
