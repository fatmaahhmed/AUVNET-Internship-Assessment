import {
  Category,
  CreateCategoryRequest,
  PaginatedResponse,
  UpdateCategoryRequest,
} from "../../types";

export interface CategoryDao {
  getCategoryById(categoryId: number): Promise<Category | null>;
  getAllCategories(
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<Category>>;
  createCategory(category: CreateCategoryRequest): Promise<Category>;
  updateCategory(
    categoryId: number,
    updateData: UpdateCategoryRequest
  ): Promise<Category>;
  deleteCategory(categoryId: number): Promise<void>;
}
