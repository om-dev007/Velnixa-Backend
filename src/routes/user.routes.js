import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { deleteUserController, getUserController, updateUserController } from "../controllers/user.controller.js";

const userRoutes = Router();

userRoutes.get("/", authMiddleware, getUserController);
userRoutes.post("/update/:id", authMiddleware, updateUserController)
userRoutes.delete("/delete/:id", authMiddleware, deleteUserController )

export default userRoutes;