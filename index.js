import express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());

app.listen( port, () => { console.log(`App up and running on http://localhost:${port}`) })