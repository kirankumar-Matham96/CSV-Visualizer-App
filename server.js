import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectToDb } from "./src/config/db.config.js";
import csvRouter from "./src/features/CSV/csv.routes.js";
import { errorHandlerMiddleware } from "./src/middlewares/errorHandler.middleware.js";
import { unknownPathHandlerMiddleware } from "./src/middlewares/unknownPathHandler.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/csv", csvRouter);

app.get("/", (req, res) => {
  res.send("Welcome to CSV visualizer API");
});

app.use(unknownPathHandlerMiddleware);

app.use(errorHandlerMiddleware);

app.listen(3000, () => {
  console.log("Server is running at 3000");
  connectToDb();
});
