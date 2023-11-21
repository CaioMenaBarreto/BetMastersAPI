import express from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routers/index-router";
import errorMiddleware from "./middlewares/error-validation";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorMiddleware);

export default app;