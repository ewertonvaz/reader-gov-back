import express from "express";
import * as dotenv from "dotenv";
import connect from "./config/db.config.js";
import userRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT;
const dbName = process.env.MONGO_DATABASE;

app.use(express.json());
app.use("/user", userRoutes);

connect(dbName);

app.listen( port, () => { console.log(`App up and running on http://localhost:${port}`) })