import express from "express";
import * as dotenv from "dotenv";
import connect from "./config/db.config.js";
import cors from "cors";
import userRoutes from './routes/user.routes.js';
import fileRoutes from './routes/file.routes.js';
import bookRoutes from "./routes/book.routes.js";
import DocumentRoutes from "./routes/document.routes.js";
import S3Routes from "./routes/s3.routes.js";
import CloudnaryRoutes from "./routes/cloudnary.routes.js";
import ServerRoutes from "./routes/server.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
const dbName = process.env.MONGO_DATABASE;
const corsOptions = {
    origin: "*",
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(express.json());
app.use("/books", bookRoutes);
app.use("/cn", CloudnaryRoutes)
app.use("/documents", DocumentRoutes);
app.use("/file", fileRoutes);
app.use("", ServerRoutes);
app.use("/s3", S3Routes);
app.use("/user", userRoutes);

connect(dbName);

app.listen( port, () => { console.log(`App up and running on http://localhost:${port}`) })