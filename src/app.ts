import e from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import HomeRoutes from "./routes/testing.routes.ts";
import router from './routes/index.ts';

const app = e();

const corsOption = {
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOption));
app.use(e.json());
app.use(cookieParser())
app.use("/", HomeRoutes);
app.use("/api", router);

export default app;