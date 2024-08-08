import {
  Category,
  CreateCategoryRequest,
  PaginatedResponse,
  UpdateCategoryRequest,
} from "../sql/models/types";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CategoryDAO {
  async createCategory(categoryData: CreateCategoryRequest): Promise<Category> {
    return prisma.category.create({ data: categoryData });
  }

  async getCategoryById(categoryId: number): Promise<Category | null> {
    return prisma.category.findUnique({ where: { category_id: categoryId } });
  }

  async updateCategory(
    categoryId: number,
    categoryData: UpdateCategoryRequest
  ): Promise<Category | null> {
    return prisma.category.update({
      where: { category_id: categoryId },
      data: categoryData,
    });
  }

  async deleteCategory(categoryId: number): Promise<Category | null> {
    return prisma.category.delete({ where: { category_id: categoryId } });
  }

  async getAllCategories(
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<Category>> {
    const skip = (page - 1) * pageSize;
    const [total, data] = await Promise.all([
      prisma.category.count(),
      prisma.category.findMany({ skip, take: pageSize }),
    ]);
    return { data, page, pageSize, total };
  }
}
