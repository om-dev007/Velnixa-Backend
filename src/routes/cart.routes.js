import { Router } from "express";
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { addToCartController } from "../controllers/cart.controller.js";

const cartRoutes = Router();

cartRoutes.post("/add", authMiddleware, addToCartController)

export default cartRoutes;