import e from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';
import getProductRoutes from './routes/getProduct.routes.js';

const app = e();

app.use(e.json());
app.use(cors({origin: "http://localhost:5173",credentials: true}));
app.use(cookieParser())
app.use("/api/auth", authRoutes);
app.use("/user/profile", userRoutes);
app.use("/admin", productRoutes);
app.use("/products", getProductRoutes);
import cartRoutes from './routes/cart.routes.js';
app.use("/cart", cartRoutes);

export default app;