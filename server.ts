import app from "./src/app";
import { connectDb } from "./src/db/db";
import dotenv from "dotenv";
dotenv.config();

connectDb();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is listening on ${port}...`);
})