    import { Router } from 'express';
    import { productMiddleware } from '../middlewares/product.middleware';
    import { createProductController} from '../controllers/product.controller';

    const productRoutes = Router();

    productRoutes.post("/create-product", productMiddleware, createProductController)

    export default productRoutes;