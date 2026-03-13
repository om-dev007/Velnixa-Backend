import app from "./src/app.js";
import { connectDb } from "./src/db/db.js";
import dotenv from "dotenv";
dotenv.config();

connectDb();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is listening on ${port}...`);
})