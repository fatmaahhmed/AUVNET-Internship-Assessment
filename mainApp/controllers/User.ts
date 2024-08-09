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
import { PrismaClient } from "@prisma/client";
import { UserImpl } from "../DB/DAO/UserDAO";
import bcrypt from "bcrypt";
import { dbPromise } from "../DB/database";
import generateAuthToken from "../middlewares/auth";

const prisma = new PrismaClient();

export class UserService {
  // Initialize the UserDAO instance
  private userDAO: UserImpl;
  constructor() {
    this.userDAO = new UserImpl();
    console.log("UserDAO initialized:", this.userDAO);
  }
  //function for admin and user

  async signUp(req: Request, res: Response) {
    try {
      console.log("Request Body:", req.body);
      if (!this.userDAO) {
        throw new Error("UserDAO instance is not initialized");
      }
      const user: CreateUserRequest = req.body;
      const createdUser = await this.userDAO.createUser(user);
      res.status(201).json({ User: createdUser });
    } catch (error) {
      console.error("Failed to create user:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        throw new Error("Missing email or password");
      }
      console.log(email, password);
      const user: User | null = await this.userDAO.getUserByEmail(email);
      if (!user) {
        res.status(404).json({ error: "password or email not true" });
      }
      console.log("User pass:", user!.password);
      const isPasswordValid = await bcrypt.compare(password, user!.password);
      console.log("isPasswordValid", isPasswordValid);
      if (isPasswordValid && user?.username && user.email && user.role) {
        const token = generateAuthToken({
          name: user?.username ?? "defaultUsername",
          email: user?.email ?? "defaultUsername",
          role: user?.role ?? "defaultUsername",
        });

        user.token = token;
        if (user.user_id != null) {
          const updateRequest: UpdateUserRequest = { token: token }; // Constructing the request object
          const updated = await this.userDAO.updateUser(
            user.user_id,
            updateRequest
          );
          res.status(201).json({ User: updated });
          return;
        } else {
          throw new Error("User ID is not defined.");
        }
        return;
      }

      res.status(404).json({ error: "password or email not true" });
    } catch (err) {
      console.error("Failed to login:", err);
      res.status(500).json({ error: "Failed to login" });
    }
  }

  //wishlist

  async viewWishList(req: Request, res: Response) {
    const userId = parseInt(req.params.userId, 10); // Extract userId from URL parameters

    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    try {
      // Fetch wish list items for the user
      const wishListItems = await prisma.wishList.findMany({
        where: { user_id: userId },
        include: { Product: true }, // Include product details
        orderBy: { wishlist_id: "asc" }, // Optional: Order by wish list ID
      });

      if (wishListItems.length === 0) {
        return res.status(404).json({ message: "No wish list items found" });
      }

      res.status(200).json({ wishListItems });
    } catch (error) {
      console.error("Error fetching wish list items:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async addToWishList(req: Request, res: Response) {
    const userId = parseInt(req.params.userId, 10); // Extract userId from URL parameters
    const { productId, productName } = req.body; // Extract product details from request body

    if (isNaN(userId) || !productId || !productName) {
      return res
        .status(400)
        .json({ error: "Invalid user ID or missing product details" });
    }

    try {
      //check if id is true
      const user = await prisma.user.findUnique({ where: { user_id: userId } });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // Check if the product exists
      const product = await prisma.product.findUnique({
        where: { name: productName },
      });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      // Check if the product already exists in the user's wish list
      const existingWishListItem = await prisma.wishList.findFirst({
        where: { user_id: userId, product_id: productId },
      });

      if (existingWishListItem) {
        return res.status(400).json({ error: "Product already in wish list" });
      }

      // Add the product to the wish list
      const newWishListItem = await prisma.wishList.create({
        data: {
          user_id: userId,
          product_id: productId,
          product_name: productName,
        },
      });

      res
        .status(201)
        .json({ message: "Product added to wish list", newWishListItem });
    } catch (error) {
      console.error("Error adding to wish list:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteWishlistItem(req: Request, res: Response) {
    const userId = +req.params.userId;

    try {
      // Check if the wish list item exists for the user
      const wishListItem = await prisma.wishList.findFirst({
        where: {
          user_id: userId,
        },
      });

      if (!wishListItem) {
        return res.status(404).json({ error: "Wish list item not found" });
      }

      // Delete the wish list item
      await prisma.wishList.delete({
        where: {
          wishlist_id: wishListItem.wishlist_id,
        },
      });

      res.status(200).json({ message: "Product removed from wishlist" });
    } catch (err) {
      console.error("Error deleting wish list item:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  //CRUD-->product
  async addProduct(req: Request, res: Response) {
    const userId = parseInt(req.params.user_id, 10);
    const { name, description, price, category_id, category_name } = req.body;

    if (!name || !description || !price || !category_id || !category_name) {
      return res
        .status(400)
        .json({ error: "All fields except user_id are required" });
    }

    try {
      // Check if category and user exist
      const category = await prisma.category.findUnique({
        where: {
          category_id: category_id,
          category_name: category_name,
        },
      });

      if (!category) {
        return res.status(400).json({ error: "Invalid category ID or name" });
      }

      const user = await prisma.user.findUnique({
        where: {
          user_id: userId,
        },
      });

      if (!user) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      // Insert the new product
      await prisma.product.create({
        data: {
          name,
          description,
          price,
          category_id,
          user_id: userId,
          category_name,
        },
      });

      res.status(201).json({ message: "Product added successfully" });
    } catch (err) {
      console.error("Error adding product:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  prisma = new PrismaClient();

  async updateProduct(req: Request, res: Response) {
    const { userId, productId } = req.params; // Extract userId and productId from URL parameters
    const { name, description, price, category_id, category_name } = req.body;

    if (!name && !description && !price && !category_id && !category_name) {
      return res
        .status(400)
        .json({ error: "At least one field must be provided to update" });
    }

    try {
      // Check if the product exists and belongs to the user
      const product = await prisma.product.findUnique({
        where: {
          product_id: Number(productId),
        },
      });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Check if the product belongs to the user
      if (product.user_id !== Number(userId)) {
        return res
          .status(403)
          .json({ error: "You do not have permission to update this product" });
      }

      // Optional: Validate category_id and category_name if provided
      if (category_id || category_name) {
        const categoryExists = await prisma.category.findFirst({
          where: {
            category_id: category_id ? Number(category_id) : undefined,
            category_name: category_name || undefined,
          },
        });

        if (!categoryExists) {
          return res.status(400).json({ error: "Invalid category ID or name" });
        }
      }

      // Build the update data dynamically
      const updateData: any = {};
      if (name) updateData.name = name;
      if (description) updateData.description = description;
      if (price) updateData.price = price;
      if (category_id) updateData.category_id = Number(category_id);
      if (category_name) updateData.category_name = category_name;

      // Execute the update query
      await prisma.product.update({
        where: { product_id: Number(productId) },
        data: updateData,
      });

      res.status(200).json({ message: "Product updated successfully" });
    } catch (err) {
      console.error("Error updating product:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    const { userId = "0", productId } = req.params; // Extract userId and productId from URL parameters

    try {
      const reqPath = req.path; // Full path of the request
      console.log(reqPath); // Log the full path for debugging
      // Construct the full path for comparison if needed
      const fullPath = `/admin/deleteproducts/${productId}`;

      console.log("Full path:", fullPath); // Log the constructed path

      if (userId === "0" && fullPath.startsWith("/admin/deleteproducts")) {
        // Admin can delete any product
        const product = await prisma.product.findFirst({
          where: {
            product_id: parseInt(productId, 10),
          },
        });

        if (!product) {
          return res.status(404).json({ error: "Product not found" });
        }
      }
      // Check if the product exists and belongs to the user
      const product = await prisma.product.findFirst({
        where: {
          product_id: parseInt(productId, 10),
          user_id: parseInt(userId, 10),
        },
      });

      if (!product) {
        return res
          .status(404)
          .json({ error: "Product not found or does not belong to the user" });
      }

      // Delete the product
      await prisma.product.delete({
        where: { product_id: parseInt(productId, 10) },
      });

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
      console.error("Error deleting product:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getPaginatedProducts(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1; // Default to page 1
    const pageSize = parseInt(req.query.pageSize as string) || 10; // Default to 10 items per page

    if (page < 1 || pageSize < 1) {
      return res.status(400).json({ error: "Invalid page or pageSize value" });
    }

    try {
      const products = await prisma.product.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          product_id: "asc",
        },
      });

      // Fetch total count of products
      const totalProducts = await prisma.product.count();

      // Send paginated response with product details
      res.status(200).json({
        page,
        pageSize,
        totalProducts,
        totalPages: Math.ceil(totalProducts / pageSize),
        products, // Detailed product information
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default UserService;

export const userService = new UserService();
