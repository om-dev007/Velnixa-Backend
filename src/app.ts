import e from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import HomeRoutes from "./routes/testing.routes";
import router from './routes/index';

const app = e();

const allowedOrigins = [
  "https://velnixa.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(e.json());
app.use(cookieParser());

app.use("/", HomeRoutes);
app.use("/api", router);

export default app;