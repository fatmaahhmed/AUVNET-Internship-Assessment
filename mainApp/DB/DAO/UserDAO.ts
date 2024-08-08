import {
  CreateUserRequest,
  PaginatedResponse,
  Product,
  UpdateUserRequest,
  User,
} from "../sql/models/types";

import { UserDao } from "./UserInterface";
import bcrypt from "bcrypt";
import { dbPromise } from "../database";
import generateAuthToken from "../../middlewares/auth";

const saltRounds = 10; // Number of salt rounds for bcrypt
export class UserImpl implements UserDao {
  createWishlist(userId: number, productId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getWishlistByUserId(
    userId: number,
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<Product>> {
    throw new Error("Method not implemented.");
  }
  deleteWishlistItem(userId: number, productId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  addProduct(product: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  viewProducts(
    userId: number,
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<Product>> {
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
  // async viewProducts(userId: number) {
  //   const db = await dbPromise;
  //   const query = "SELECT * FROM Product WHERE user_id = ?";
  //   return await this.db.all(query, [userId]);
  // }
  async getUserByEmail(email: string): Promise<User | null> {
    const db = await dbPromise;
    const user = await db.get<User>("SELECT * FROM User WHERE email =?", email);
    return user || null;
  }

  async getUserById(userId: number): Promise<User | null> {
    const db = await dbPromise;
    const user = await db.get<User>(
      "SELECT * FROM User WHERE user_id = ?",
      userId
    );
    return user || null;
  }

  // async getAllUsers(
  //   page: number,
  //   pageSize: number
  // ): Promise<PaginatedResponse<User>> {
  //   const db = await dbPromise;
  //   const offset = (page - 1) * pageSize;

  //   const users = await db.all<User[]>(
  //     "SELECT * FROM User LIMIT ? OFFSET ?",
  //     pageSize,
  //     offset
  //   );
  //   const totalCount = await db.get<{ count: number }>(
  //     "SELECT COUNT(*) as count FROM User"
  //   );

  //   return {
  //     data: users,
  //     page,
  //     pageSize,
  //     total: totalCount?.count || 0,
  //   };
  // }
  // View all users
  // async getAllUsers() {
  //   const db = await dbPromise;
  //   const query = "SELECT * FROM User";
  //   return await this.db.all(query);
  // }

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

    const db = await dbPromise;
    const token = generateAuthToken({
      name: user.name,
      email: user.email,
      role: "user",
    });
    const result = await db.run(
      "INSERT INTO User (username, name, email, password,token) VALUES (?, ?, ?, ?,?)",
      user.username,
      user.name,
      user.email,
      hashedPassword,
      token
    );
    const createdUser: User = {
      username: user.username,
      name: user.name,
      email: user.email,
      password: hashedPassword,
      token,
    };

    return createdUser;
  }

  async updateUser(
    userId: number,
    updateData: UpdateUserRequest
  ): Promise<User> {
    const db = await dbPromise;
    const setClause = Object.keys(updateData)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(updateData);

    await db.run(
      `UPDATE User SET ${setClause} WHERE user_id = ?`,
      ...values,
      userId
    );
    const updatedUser = await this.getUserById(userId);
    if (!updatedUser) {
      throw new Error("User not found after update");
    }

    return updatedUser;
  }
  // View user's products

  async deleteUser(userId: number): Promise<void> {
    const db = await dbPromise;
    // Check if the user exists
    const user = await db.get("SELECT * FROM User WHERE user_id = ?", userId);
    if (!user) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }
    // Delete the user if they exist
    await db.run("DELETE FROM User WHERE user_id = ?", userId);
  }
}
