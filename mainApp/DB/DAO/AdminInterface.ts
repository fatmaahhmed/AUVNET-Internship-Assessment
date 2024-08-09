// import {
//   Admin,
//   Category,
//   CreateUserRequest,
//   Product,
//   UpdateCategoryRequest,
//   User,
// } from "../sql/models/types";

// export interface AdminDao {
//   // Admin authentication

//   // Admin management
//   getAdminById(userId: number): Promise<User | null>;
//   getAllAdmins(): Promise<Admin[]>;
//   createAdmin(user: CreateUserRequest): Promise<User>;
//   updateAdmin(req: Request, res: Response);
//   deleteAdmin(userId: number): Promise<void>;

//   // User management
//   getUserById(userId: number): Promise<User | null>;
//   getAllUsers(): Promise<User[]>;
//   deleteUser(userId: number): Promise<void>;

//   // Product management
//   getProductById(productId: number): Promise<Product | null>;
//   getAllProducts(): Promise<Product[]>;
//   addProduct(product: Product): Promise<Product>;
//   updateProduct(
//     productId: number,
//     updateData: Partial<Product>
//   ): Promise<Product>;
//   deleteProduct(productId: number): Promise<void>;

//   // Category management
//   getCategoryById(categoryId: number): Promise<Category | null>;
//   getAllCategories(): Promise<Category[]>;
//   addCategory(category: Category): Promise<Category>;
//   updateCategory(
//     categoryId: number,
//     updateData: UpdateCategoryRequest
//   ): Promise<Category>;
//   deleteCategory(categoryId: number): Promise<void>;
// }
