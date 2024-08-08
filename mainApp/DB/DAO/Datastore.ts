import { AdminDAO } from "./AdminDao";
import { CategoryDAO } from "./CategoryDAO";
import { ProductDAO } from "./ProductDAO";
// import { UserDAO } from "./UserDAO";
import { WishListDAO } from "./WishListDAO";

export interface Datastore
  extends AdminDAO,
    CategoryDAO,
    ProductDAO,
    WishListDAO {}
