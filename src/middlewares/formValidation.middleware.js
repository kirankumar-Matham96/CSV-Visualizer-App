import { body, validationResult } from "express-validator";
import { ApplicationError } from "./errorHandler.middleware.js";

export const validate = async (req, res, next) => {
  try {
    const file = req.file;

    await body("file")
      .notEmpty()
      .custom(async (value) => {
        if (
          file.mimetype !== "text/csv" ||
          !file.originalname.endswith(".csv")
        ) {
          throw new Error("please upload csv files only", 400);
        }
      })
      .run(req);

    const validationResults = validationResult(req);

    console.log(validationResults.array().length);

    if (validationResults.array().length > 0) {
      throw new ApplicationError("Invalid file format", 400);
    }

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
