import { Router } from "express";
import {
  toggleWishlistController,
  getWishlistController,
  removeFromWishlistController
} from "../controllers/wishlist.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const wishlistRouter = Router();

wishlistRouter.post("/toggle", authMiddleware, toggleWishlistController);
wishlistRouter.get("/", authMiddleware, getWishlistController);
wishlistRouter.delete("/:productId", authMiddleware, removeFromWishlistController);

export default wishlistRouter;