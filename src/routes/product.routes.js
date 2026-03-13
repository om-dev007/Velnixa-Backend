import { Router } from 'express';
import { productMiddleware } from '../middlewares/product.middleware.js';
import { createProductController} from '../controllers/product.controller.js';

const productRoutes = Router();

productRoutes.post("/create-product", productMiddleware, createProductController)

export default productRoutes;