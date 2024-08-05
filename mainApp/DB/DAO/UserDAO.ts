import { PaginatedResponse, UpdateUserRequest, User } from "../../types";

export interface UserDao {
  getUserById(userId: number): Promise<User | null>;
  getAllUsers(page: number, pageSize: number): Promise<PaginatedResponse<User>>;
  createUser(user: User): Promise<User>;
  updateUser(userId: number, updateData: UpdateUserRequest): Promise<User>;
  deleteUser(userId: number): Promise<void>;
}
