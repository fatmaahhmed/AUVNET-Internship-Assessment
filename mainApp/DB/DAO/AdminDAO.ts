import {
  Admin,
  CreateAdminRequest,
  UpdateAdminRequest,
} from "../sql/models/types";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AdminDAO {
  async createAdmin(adminData: CreateAdminRequest): Promise<Admin> {
    return prisma.admin.create({ data: adminData });
  }

  async getAdminById(adminId: number): Promise<Admin | null> {
    return prisma.admin.findUnique({ where: { user_id: adminId } });
  }

  async updateAdmin(
    adminId: number,
    adminData: UpdateAdminRequest
  ): Promise<Admin | null> {
    return prisma.admin.update({
      where: { user_id: adminId },
      data: adminData,
    });
  }

  async deleteAdmin(adminId: number): Promise<Admin | null> {
    return prisma.admin.delete({ where: { user_id: adminId } });
  }

  async getAdminByUsername(username: string): Promise<Admin | null> {
    return prisma.admin.findUnique({ where: { username } });
  }
}
