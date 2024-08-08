import {
  CreateProductRequest,
  PaginatedResponse,
  Product,
  UpdateProductRequest,
} from "../sql/models/types";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProductDAO {
  async createProduct(productData: CreateProductRequest): Promise<Product> {
    return prisma.product.create({ data: productData });
  }

  async getProductById(productId: number): Promise<Product | null> {
    return prisma.product.findUnique({ where: { product_id: productId } });
  }

  async updateProduct(
    productId: number,
    productData: UpdateProductRequest
  ): Promise<Product | null> {
    return prisma.product.update({
      where: { product_id: productId },
      data: productData,
    });
  }

  async deleteProduct(productId: number): Promise<Product | null> {
    return prisma.product.delete({ where: { product_id: productId } });
  }

  async getAllProducts(
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<Product>> {
    const skip = (page - 1) * pageSize;
    const [total, data] = await Promise.all([
      prisma.product.count(),
      prisma.product.findMany({ skip, take: pageSize }),
    ]);
    return { data, page, pageSize, total };
  }
}
