import app from "./src/app.ts";
import { connectDb } from "./src/db/db.ts";
import dotenv from "dotenv";
dotenv.config();

connectDb();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is listening on ${port}...`);
})