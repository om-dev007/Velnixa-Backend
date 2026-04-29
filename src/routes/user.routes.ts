import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.ts";
import { deleteUserController, getUserController, updateUserController } from "../controllers/user.controller.ts";

const userRoutes = Router();

userRoutes.get("/", authMiddleware, getUserController);
userRoutes.post("/update/:id", authMiddleware, updateUserController)
userRoutes.delete("/delete/:id", authMiddleware, deleteUserController )

export default userRoutes;