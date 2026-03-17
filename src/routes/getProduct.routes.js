import { Router } from "express";
import { getDataProductController, getKidsProductController, getMenProductController, getNewArrivalProduct, getPopularProductController, getProductByCategory, getProductById, getProductController, getWomenProductController } from "../controllers/getProduct.controller.js";

const getProductRoutes = Router();

getProductRoutes.get("/", getProductController)
getProductRoutes.get("/data", getDataProductController)
getProductRoutes.get("/popular", getPopularProductController)
getProductRoutes.get("/men", getMenProductController)
getProductRoutes.get("/women", getWomenProductController)
getProductRoutes.get("/kids", getKidsProductController)
getProductRoutes.get(`/filter`, getProductByCategory)
getProductRoutes.get("/new-arrivals", getNewArrivalProduct);
getProductRoutes.get("/:id", getProductById);

export default getProductRoutes