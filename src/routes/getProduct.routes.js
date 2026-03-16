import { Router } from "express";
import { getDataProductController, getKidsProductController, getMenProductController, getPopularProductController, getProductByCategory, getProductController, getWomenProductController } from "../controllers/getProduct.controller.js";

const getProductRoutes = Router();

getProductRoutes.get("/", getProductController)
getProductRoutes.get("/data", getDataProductController)
getProductRoutes.get("/popular", getPopularProductController)
getProductRoutes.get("/men", getMenProductController)
getProductRoutes.get("/women", getWomenProductController)
getProductRoutes.get("/kids", getKidsProductController)
getProductRoutes.get(`/filter`, getProductByCategory)

export default getProductRoutes