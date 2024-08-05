import {
  Admin,
  CreateAdminRequest,
  PaginatedResponse,
  UpdateAdminRequest,
} from "../../types";

export interface AdminDao {
  getAdminById(adminId: number): Promise<Admin | null>;
  getAllAdmins(
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<Admin>>;
  createAdmin(admin: CreateAdminRequest): Promise<Admin>;
  updateAdmin(adminId: number, updateData: UpdateAdminRequest): Promise<Admin>;
  deleteAdmin(adminId: number): Promise<void>;
}
