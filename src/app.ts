import e from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.ts';
import userRoutes from './routes/user.routes.ts';
import productRoutes from './routes/product.routes.ts';
import getProductRoutes from './routes/getProduct.routes.ts';
import cartRoutes from './routes/cart.routes.ts';
import wishlistRouter from './routes/wishlist.routes.ts';
import HomeRoutes from "./routes/testing.routes.ts";

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
app.use("/", HomeRoutes);

export default app;