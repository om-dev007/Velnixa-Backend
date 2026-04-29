import { Router } from "express";
import { authMiddleware } from '../middlewares/auth.middleware.ts';
import { addToCartController, deleteCartController, getCartController, updateQuantityController } from "../controllers/cart.controller.ts";

const cartRoutes = Router();

cartRoutes.post("/add", authMiddleware, addToCartController)
cartRoutes.get("/get", authMiddleware, getCartController)
cartRoutes.delete("/delete/:productId/:size", authMiddleware, deleteCartController)
cartRoutes.patch("/update", authMiddleware, updateQuantityController)

export default cartRoutes;