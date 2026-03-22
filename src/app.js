import e from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';
import getProductRoutes from './routes/getProduct.routes.js';
import cartRoutes from './routes/cart.routes.js';
import wishlistRouter from './routes/wishlist.routes.js';

const app = e();

app.use(e.json());
const allowedOrigins = [
    "http://localhost:5173",
    "https://velnixa.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {

        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS not allowed"));
        }

    },
    credentials: true
}));
app.use(cookieParser())
app.use("/api/auth", authRoutes);
app.use("/user/profile", userRoutes);
app.use("/admin", productRoutes);
app.use("/products", getProductRoutes);
app.use("/cart", cartRoutes);
app.use("/wishlist", wishlistRouter)

export default app;