import { RequestHandler } from "express";

export type Role = {
  role_id: number;
  role_name: "Admin" | "User";
};

// User Types
export type User = {
  user_id?: number | null;
  username?: string;
  name?: string;
  email?: string;
  password: string;
  role?: string;
  token?: string | null;
};

// Admin Types
export type Admin = User & {};

// Category Types
export type Category = {
  category_id: number;
  name: string;
  parent_id?: number; // FK to Category, nullable for top-level categories
};

// Product Types
export type Product = {
  product_id?: number;
  name: string;
  description: string;
  price: Number;
  user_id?: number; // FK to User
  category_id?: number; // FK to Category
};

// WishList Types
export type WishList = {
  wishlist_id: number;
  ProductName: string; //
  user_id: number; // FK to User
  product_id: number; // FK to Product
};

// Authentication Types
export type AuthRequest = {
  username: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

// API Response Types
export type PaginatedResponse<T> = {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
};

// Admin Request Types
export type CreateAdminRequest = {
  username: string;
  email: string;
  password: string;
  role_id: number;
};

export type UpdateAdminRequest = {
  username?: string;
  email?: string;
  password?: string;
  role_id?: number;
};

// Product Request Types
export type CreateProductRequest = {
  product_name: string;
  user_id: number;
  category_id: number;
  price: number;
  description?: string;
};

export type UpdateProductRequest = {
  product_name?: string;
  category_id?: number;
  price?: number;
  description?: string;
};

// Category Request Types
export type CreateCategoryRequest = {
  category_name: string;
  parent_id?: number;
};

export type UpdateCategoryRequest = {
  category_name?: string;
  parent_id?: number;
};

// WishList Request Types
export type AddToWishListRequest = {
  user_id: number;
  product_id: number;
};

export type RemoveFromWishListRequest = {
  user_id: number;
  product_id: number;
};

// User Request Types
export type CreateUserRequest = {
  role: string;
  username: string;
  name: string;
  email: string;
  password: string;
};

export type UpdateUserRequest = {
  username?: string;
  name?: string;
  email?: string;
  password?: string;
  token?: string;
};

// Additional User Request Types
export type GetUserRequest = {
  user_id: number;
};

export type DeleteUserRequest = {
  user_id: number;
};

export type JwtObject = {
  email: string;
  name: string;
};

type WithError<T> = T & { error: string };
export interface LoginRequest {
  email: string;
  password: string;
}

export type ExpressHandler<Req, Res> = RequestHandler<
  string,
  Partial<WithError<Res>>,
  Partial<Req>,
  any
>;
