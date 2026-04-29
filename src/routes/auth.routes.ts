import { Router } from "express";
import { logInUserController, logOutUserController, registerUserController } from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/register", registerUserController);
authRoutes.post("/login", logInUserController);
authRoutes.post("/logout", logOutUserController)

export default authRoutes;