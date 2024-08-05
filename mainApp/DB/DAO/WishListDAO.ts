import {
  AddToWishListRequest,
  PaginatedResponse,
  RemoveFromWishListRequest,
  WishList,
} from "../../types";

export interface WishListDao {
  getWishListByUserId(
    userId: number,
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<WishList>>;
  addToWishList(request: AddToWishListRequest): Promise<WishList>;
  removeFromWishList(request: RemoveFromWishListRequest): Promise<void>;
}
