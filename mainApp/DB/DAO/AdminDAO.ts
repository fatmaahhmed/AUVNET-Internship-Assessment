// // import {
// //   // PaginatedResponse,
// //   UpdateUserRequest,
// //   User,
// // } from "../sql/models/types";

// import {
//   Admin,
//   Category,
//   Product,
//   UpdateCategoryRequest,
//   User,
// } from "../sql/models/types";
// // import {
// //   Admin,
// //   User,
// //   Product,
// //   Category,
// //   UpdateCategoryRequest,
// // } from "../models/types";
// import {
//   AuthRequest,
//   CreateUserRequest,
//   DeleteUserRequest,
//   GetUserRequest,
//   LoginRequest,
//   UpdateUserRequest,
// } from "../sql/models/types";
// import { Request, Response } from "express";

// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";
// import generateAuthToken from "../../middlewares/auth";

// const saltRounds = 10;

// //   async getAdminByUsername(username: string): Promise<Admin | null> {
// //     return prisma.admin.findUnique({ where: { username } });
// //   }

// // export interface AdminDao {
// //   //todo:CRUD(Admins)
// //   createUser(user: User): Promise<User>;
// //   getAllUsers(page: number, pageSize: number): Promise<PaginatedResponse<User>>;
// //   getUserById(userId: number): Promise<User | null>;
// //   getUserByEmail(email: string): Promise<User | null>;
// //   updateUser(userId: number, updateData: UpdateUserRequest): Promise<User>;
// //   deleteUser(userId: number): Promise<void>;
// //   //todo:CRUD(category)
// //   createcategory(user: User): Promise<User>;
// //   getAllcategory(
// //     page: number,
// //     pageSize: number
// //   ): Promise<PaginatedResponse<User>>;
// //   getcategoryById(userId: number): Promise<User | null>;
// //   updatecategory(userId: number, updateData: UpdateUserRequest): Promise<User>;
// //   deletecategory(userId: number): Promise<void>;
// //   // getUserByEmail(email: string): Promise<User | null>;
// //   //todo::rd (Users)
// //   getAllUsers(page: number, pageSize: number): Promise<PaginatedResponse<User>>;
// //   getUserById(userId: number): Promise<User | null>;
// //   getUserByEmail(email: string): Promise<User | null>;
// //   deleteUser(userId: number): Promise<void>;

// //   //todo::rd (Products)
// //   getAllUsers(page: number, pageSize: number): Promise<PaginatedResponse<User>>;
// //   getUserById(userId: number): Promise<User | null>;
// //   getUserByEmail(email: string): Promise<User | null>;
// //   deleteUser(userId: number): Promise<void>;

// //   getAllProducts(
// //     page: number,
// //     pageSize: number
// //   ): Promise<PaginatedResponse<User>>;
// //   deleteProduct(userId: number): Promise<void>;
// //   //   CRUD-->Products
// //   //
// //   // viewCategories():
// //   //  addCategory():
// //   //  updateCategory():
// //   //  deleteCategory():
// // }
// // import {
// //   Admin,
// //   CreateAdminRequest,
// //   UpdateAdminRequest,
// // } from "../sql/models/types";

// // import { PrismaClient } from "@prisma/client";

// // const prisma = new PrismaClient();

// // export class AdminDAO {
// //   async createAdmin(adminData: CreateAdminRequest): Promise<Admin> {
// //     return prisma.admin.create({ data: adminData });
// //   }

// //   async getAdminById(adminId: number): Promise<Admin | null> {
// //     return prisma.admin.findUnique({ where: { user_id: adminId } });
// //   }

// //   async updateAdmin(
// //     adminId: number,
// //     adminData: UpdateAdminRequest
// //   ): Promise<Admin | null> {
// //     return prisma.admin.update({
// //       where: { user_id: adminId },
// //       data: adminData,
// //     });
// //   }

// //   async deleteAdmin(adminId: number): Promise<Admin | null> {
// //     return prisma.admin.delete({ where: { user_id: adminId } });
// //   }

// // import { AdminDao } from "./adminDao";
// const prisma = new PrismaClient();
// export class AdminImpl {
//   private prisma: PrismaClient;

//   constructor() {
//     this.prisma = new PrismaClient();
//   }
//   async deleteAdmin(userId: number): Promise<void> {
//     try {
//       // Delete the user with the specified ID
//       await prisma.user.delete({
//         where: { user_id: userId },
//       });
//       console.log(`User with ID ${userId} deleted successfully.`);
//     } catch (error) {
//       // Handle errors (e.g., user not found)
//       console.error(`Failed to delete user with ID ${userId}:`, error);
//       throw new Error(`Failed to delete user with ID ${userId}`);
//     }
//   }
//   async getAllAdmins(): Promise<User[]> {
//     return this.prisma.user.findMany({
//       where: { role: "admin" },
//     });
//   }

//   async getAdminById(userId: number): Promise<User | null> {
//     return this.prisma.user.findFirst({
//       where: {
//         user_id: userId,
//         role: "admin",
//       },
//     });
//   }
//   async createAdmin(user: CreateUserRequest): Promise<User> {
//     // Validate required fields
//     if (!user.username || !user.email || !user.password || !user.name) {
//       throw new Error(
//         "Missing required fields: username, email, password, name"
//       );
//     }

//     // Check if the email already exists
//     const existingUser = await this.getUserByEmail(user.email);
//     if (existingUser) {
//       throw new Error("Email already exists");
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(user.password, saltRounds);

//     // Generate the token
//     const token = generateAuthToken({
//       name: user.name,
//       email: user.email,
//       role: "admin", // Since we are creating an admin, role is set to 'admin'
//     });

//     // Create the admin user in the database
//     const createdUser = await prisma.user.create({
//       data: {
//         username: user.username,
//         name: user.name,
//         email: user.email,
//         password: hashedPassword,
//         token,
//         role: "admin", // Explicitly set the role to 'admin'
//       },
//     });

//     return createdUser;
//   }
//   async updateAdmin(req: Request, res: Response) {
//     const { adminId } = req.params; // Extract adminId from URL parameters
//     const { username, name, email, password, role } = req.body;

//     if (!username && !name && !email && !password && !role) {
//       return res
//         .status(400)
//         .json({ error: "At least one field must be provided to update" });
//     }

//     try {
//       // Check if the admin exists
//       const admin = await prisma.user.findUnique({
//         where: {
//           user_id: Number(adminId),
//         },
//       });

//       if (!admin) {
//         return res.status(404).json({ error: "Admin not found" });
//       }

//       // Optional: Validate email if provided
//       if (email) {
//         const emailExists = await prisma.user.findUnique({
//           where: { email },
//         });

//         if (emailExists && emailExists.user_id !== Number(adminId)) {
//           return res.status(400).json({ error: "Email already exists" });
//         }
//       }

//       // Build the update data dynamically
//       const updateData: any = {};
//       if (username) updateData.username = username;
//       if (name) updateData.name = name;
//       if (email) updateData.email = email;
//       if (password)
//         updateData.password = await bcrypt.hash(password, saltRounds);
//       if (role) updateData.role = role;

//       // Execute the update query
//       const updatedAdmin = await prisma.user.update({
//         where: { user_id: Number(adminId) },
//         data: updateData,
//       });

//       res
//         .status(200)
//         .json({ message: "Admin updated successfully", admin: updatedAdmin });
//     } catch (err) {
//       console.error("Error updating admin:", err);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }

//   async getUserByEmail(email: string): Promise<User | null> {
//     return prisma.user.findUnique({
//       where: { email },
//     });
//   }

//   async getUserById(userId: number): Promise<User | null> {
//     return this.prisma.user.findUnique({
//       where: { user_id: userId },
//     });
//   }

//   async getAllUsers(): Promise<User[]> {
//     return this.prisma.user.findMany();
//   }

//   async deleteUser(userId: number): Promise<void> {
//     await this.prisma.user.delete({
//       where: { user_id: userId },
//     });
//   }

//   async getProductById(productId: number): Promise<Product | null> {
//     return this.prisma.product.findUnique({
//       where: { product_id: productId },
//     });
//   }

//   async getAllProducts(): Promise<Product[]> {
//     return this.prisma.product.findMany();
//   }

//   async addProduct(product: Product): Promise<Product> {
//     return this.prisma.product.create({
//       data: product,
//     });
//   }

//   async updateProduct(
//     productId: number,
//     updateData: Partial<Product>
//   ): Promise<Product> {
//     return this.prisma.product.update({
//       where: { product_id: productId },
//       data: updateData,
//     });
//   }

//   async deleteProduct(productId: number): Promise<void> {
//     await this.prisma.product.delete({
//       where: { product_id: productId },
//     });
//   }

//   async getCategoryById(categoryId: number): Promise<Category | null> {
//     return this.prisma.category.findUnique({
//       where: { category_id: categoryId },
//     });
//   }

//   async getAllCategories(): Promise<Category[]> {
//     return this.prisma.category.findMany();
//   }

//   async addCategory(category: Category): Promise<Category> {
//     return this.prisma.category.create({
//       data: category,
//     });
//   }

//   async updateCategory(
//     categoryId: number,
//     updateData: UpdateCategoryRequest
//   ): Promise<Category> {
//     return this.prisma.category.update({
//       where: { category_id: categoryId },
//       data: updateData,
//     });
//   }

//   async deleteCategory(categoryId: number): Promise<void> {
//     await this.prisma.category.delete({
//       where: { category_id: categoryId },
//     });
//   }
// }
