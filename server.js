import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectToDb } from "./src/config/db.config.js";
import csvRouter from "./src/features/CSV/csv.routes.js";
import { errorHandlerMiddleware } from "./src/middlewares/errorHandler.middleware.js";

// test
// import { EOL } from "os";
// import { parse } from "@fast-csv/parse";
// // const CSV_STRING = ["a1\tb1", "a2\tb2"].join(EOL);
// const CSV_STRING = ["a1\tb1", "a2\tb2"].join(",");
// test

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/csv", csvRouter);

app.get("/", (req, res) => {
  // const stream = parse({ delimiter: "," })
  //   .on("error", (error) => console.error(error))
  //   .on("data", (row) => console.log(row))
  //   .on("end", (rowCount) => console.log(`Parsed ${rowCount} rows`));
  // stream.write(CSV_STRING);
  // stream.end();
  res.send("Welcome to CSV visualizer API");
});

app.use(errorHandlerMiddleware);

app.listen(3000, () => {
  console.log("Server is running at 3000");
  connectToDb();
});
