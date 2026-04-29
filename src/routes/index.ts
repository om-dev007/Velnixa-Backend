import { Router } from "express";
import getProductRoutes from "./getProduct.routes";
import authRoutes from "./auth.routes";
import cartRoutes from "./cart.routes";
import userRoutes from "./user.routes";
import wishlistRouter from "./wishlist.routes";
import productRoutes from "./product.routes";

const router: Router = Router();

router.use("/products", getProductRoutes)
router.use("/auth", authRoutes);
router.use("/cart", cartRoutes);
router.use("/user", userRoutes);
router.use("/wishlist", wishlistRouter)
router.use("/admin", productRoutes)

export default router;