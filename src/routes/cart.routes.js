import { Router } from "express";
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { addToCartController, getCartController } from "../controllers/cart.controller.js";

const cartRoutes = Router();

cartRoutes.post("/add", authMiddleware, addToCartController)
cartRoutes.get("/get", authMiddleware, getCartController)

export default cartRoutes;