import {
  PaginatedResponse,
  Product,
  UpdateUserRequest,
  User,
} from "../sql/models/types";

export interface UserDao {
  createUser(user: User): Promise<User>;
  getUserById(userId: number): Promise<User | null>;
  // getAllUsers(): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
  updateUser(userId: number, updateData: UpdateUserRequest): Promise<User>;
  deleteUser(userId: number): Promise<void>;
  //todo:Crd(wishlist)-->read and delete his product y3ni ykon Id of user==id of user
  createWishlist(userId: number, productId: number): Promise<void>;
  getWishlistByUserId(
    userId: number,
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<Product>>;
  deleteWishlistItem(userId: number, productId: number): Promise<void>;
  //todo::crud (Products)
  addProduct(product: Product): Promise<Product>;
  viewProducts(
    userId: number,
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<Product>>;
  updateProduct(
    productId: number,
    updateData: Partial<Product>
  ): Promise<Product>;
  deleteProduct(productId: number): Promise<void>;
}
