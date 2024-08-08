import {
  PaginatedResponse,
  UpdateUserRequest,
  User,
} from "../sql/models/types";

export interface AdminDao {
  //todo:CRUD(Admins)
  createUser(user: User): Promise<User>;
  getAllUsers(page: number, pageSize: number): Promise<PaginatedResponse<User>>;
  getUserById(userId: number): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  updateUser(userId: number, updateData: UpdateUserRequest): Promise<User>;
  deleteUser(userId: number): Promise<void>;
  //todo:CRUD(category)
  createcategory(user: User): Promise<User>;
  getAllcategory(
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<User>>;
  getcategoryById(userId: number): Promise<User | null>;
  updatecategory(userId: number, updateData: UpdateUserRequest): Promise<User>;
  deletecategory(userId: number): Promise<void>;
  // getUserByEmail(email: string): Promise<User | null>;
  //todo::rd (Users)
  getAllUsers(page: number, pageSize: number): Promise<PaginatedResponse<User>>;
  getUserById(userId: number): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  deleteUser(userId: number): Promise<void>;

  //todo::rd (Products)
  getAllUsers(page: number, pageSize: number): Promise<PaginatedResponse<User>>;
  getUserById(userId: number): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  deleteUser(userId: number): Promise<void>;

  getAllProducts(
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<User>>;
  deleteProduct(userId: number): Promise<void>;
  //   CRUD-->Products
  //
  // viewCategories():
  //  addCategory():
  //  updateCategory():
  //  deleteCategory():
}
