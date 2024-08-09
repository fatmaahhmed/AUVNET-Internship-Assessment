import { Product, UpdateUserRequest, User } from "../sql/models/types";

export interface UserDao {
  createUser(user: User): Promise<User>;
  getUserById(userId: number): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  updateUser(userId: number, updateData: UpdateUserRequest): Promise<User>;
  deleteUser(userId: number): Promise<void>;
  //todo:Crd(wishlist)-->read and delete his product y3ni ykon Id of user==id of user
  deleteWishlistItem(userId: number, product_name: string): Promise<void>;
  //todo::crud (Products)
  addProduct(product: Product): Promise<Product>;
  deleteProduct(productId: number): Promise<void>;
}
