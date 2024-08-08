import {
  AddToWishListRequest,
  RemoveFromWishListRequest,
  WishList,
} from "../sql/models/types";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class WishListDAO {
  async createWishList(wishListData: AddToWishListRequest): Promise<WishList> {
    return prisma.wishList.create({ data: wishListData });
  }

  async getWishListByUserId(userId: number): Promise<WishList[] | null> {
    return prisma.wishList.findMany({ where: { user_id: userId } });
  }

  async deleteWishList(wishListId: number): Promise<WishList | null> {
    return prisma.wishList.delete({ where: { wishlist_id: wishListId } });
  }
}
