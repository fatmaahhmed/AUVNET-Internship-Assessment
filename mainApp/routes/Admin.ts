import AdminService from "../controllers/Admin";
import express from "express";
import { userService } from "../controllers/User";

const router = express.Router();
const adminService = new AdminService();

// Route to add a new category
router.post("/categories", (req, res) => adminService.addCategory(req, res));

// Route to update an existing category
router.put("/categories/:categoryId", (req, res) =>
  adminService.updateCategory(req, res)
);

// Route to delete a category
router.delete("/categories/:categoryId", (req, res) =>
  adminService.deleteCategory(req, res)
);

// Route to get paginated categories
router.get("/categories", (req, res) =>
  adminService.getPaginatedCategories(req, res)
);
router.get("/products", (req, res) =>
  userService.getPaginatedProducts(req, res)
);

router.delete("/deleteproducts/:productId", (req, res) =>
  userService.deleteProduct(req, res)
);
export default router;
