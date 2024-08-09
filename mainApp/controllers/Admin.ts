import {
  AuthRequest,
  CreateUserRequest,
  DeleteUserRequest,
  GetUserRequest,
  LoginRequest,
  UpdateUserRequest,
  User,
} from "../DB/sql/models/types";
import { Request, Response } from "express";

import { JwtObject } from "./../DB/sql/models/types";
import JwtPayload from "../middlewares/auth";
//CRUD-->Category
import { PrismaClient } from "@prisma/client";
import { UserImpl } from "../DB/DAO/UserDAO";
import bcrypt from "bcrypt";
import { dbPromise } from "../DB/database";
import generateAuthToken from "../middlewares/auth";

const prisma = new PrismaClient();

export class AdminService {
  private prisma = new PrismaClient();

  async addCategory(req: Request, res: Response) {
    const { category_name, parent_id } = req.body;

    if (!category_name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    try {
      // Insert the new category
      const newCategory = await this.prisma.category.create({
        data: {
          category_name,
          parent_id: parent_id || null,
        },
      });

      res.status(201).json({
        message: "Category added successfully",
        category: newCategory,
      });
    } catch (err) {
      console.error("Error adding category:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateCategory(req: Request, res: Response) {
    const { categoryId } = req.params;
    const { category_name, parent_id } = req.body;

    if (!category_name && parent_id === undefined) {
      return res
        .status(400)
        .json({ error: "At least one field must be provided to update" });
    }

    try {
      // Check if the category exists
      const category = await this.prisma.category.findUnique({
        where: { category_id: Number(categoryId) },
      });

      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      // Build the update data dynamically
      const updateData: any = {};
      if (category_name) updateData.category_name = category_name;

      // Convert parent_id to a number if it is provided
      if (parent_id !== undefined) {
        updateData.parent_id = parseInt(parent_id, 10) || null;
      }

      // Execute the update query
      const updatedCategory = await this.prisma.category.update({
        where: { category_id: Number(categoryId) },
        data: updateData,
      });

      res.status(200).json({
        message: "Category updated successfully",
        category: updatedCategory,
      });
    } catch (err) {
      console.error("Error updating category:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteCategory(req: Request, res: Response) {
    const { categoryId } = req.params;

    try {
      // Check if the category exists
      const category = await this.prisma.category.findUnique({
        where: { category_id: Number(categoryId) },
      });

      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      // Delete the category
      await this.prisma.category.delete({
        where: { category_id: Number(categoryId) },
      });

      res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
      console.error("Error deleting category:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getPaginatedCategories(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1; // Default to page 1
    const pageSize = parseInt(req.query.pageSize as string) || 10; // Default to 10 items per page

    if (page < 1 || pageSize < 1) {
      return res.status(400).json({ error: "Invalid page or pageSize value" });
    }

    try {
      const categories = await this.prisma.category.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          category_id: "asc",
        },
      });

      // Fetch total count of categories
      const totalCategories = await this.prisma.category.count();

      // Send paginated response with category details
      res.status(200).json({
        page,
        pageSize,
        totalCategories,
        totalPages: Math.ceil(totalCategories / pageSize),
        categories, // Detailed category information
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default AdminService;

export const adminService = new AdminService();
