import { Router } from 'express';
import { productMiddleware } from '../middlewares/product.middleware.ts';
import { createProductController} from '../controllers/product.controller.ts';

const productRoutes = Router();

productRoutes.post("/create-product", productMiddleware, createProductController)

export default productRoutes;