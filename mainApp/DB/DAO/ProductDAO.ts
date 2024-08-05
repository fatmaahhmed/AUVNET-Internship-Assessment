import {
  CreateProductRequest,
  PaginatedResponse,
  Product,
  UpdateProductRequest,
} from "../../types";

export interface ProductDao {
  getProductById(productId: number): Promise<Product | null>;
  getAllProducts(
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<Product>>;
  createProduct(product: CreateProductRequest): Promise<Product>;
  updateProduct(
    productId: number,
    updateData: UpdateProductRequest
  ): Promise<Product>;
  deleteProduct(productId: number): Promise<void>;
}
