import { LoginRequest } from "../DB/sql/models/types";
import { Router } from "express";
import { isAdmin } from "../middlewares/roles";
import jwtMiddleware from "../middlewares/authMiddleware";
import { requestLoggerMiddleware } from "../middlewares/loggerMiddleware";
import { userService } from "../controllers/User";

const Userrouter = Router();
Userrouter.use(requestLoggerMiddleware);
//todo: Public routes
Userrouter.post("/signup", (req, res) => userService.signUp(req, res));
Userrouter.post("/login", (req, res) => userService.login(req, res));
//todo: Apply JWT middleware to all subsequent routes
Userrouter.use(jwtMiddleware);
//todo: Wishlist routes for users
Userrouter.get("/:userId/wish-list", (req, res) =>
  userService.viewWishList(req, res)
);
Userrouter.post("/:userId/wish-list", (req, res) =>
  userService.addToWishList(req, res)
);

Userrouter.delete("/:userId/wishlist/:productId", (req, res) =>
  userService.deleteWishlistItem(req, res)
);
// Product routes for users
Userrouter.post("/:user_id/addProducts", (req, res) =>
  userService.addProduct(req, res)
);
Userrouter.put("/:userId/updateproducts/:productId", (req, res) =>
  userService.updateProduct(req, res)
);

Userrouter.get("/products", (req, res) =>
  userService.getPaginatedProducts(req, res)
);

Userrouter.delete("/:userId/deleteproducts/:productId", (req, res) =>
  userService.deleteProduct(req, res)
);

export default Userrouter;
