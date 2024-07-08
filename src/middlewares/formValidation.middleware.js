import { body, validationResult } from "express-validator";
import { ApplicationError } from "./errorHandler.middleware.js";

export const validate = async (req, res, next) => {
  try {
    const file = req.file;

    if (!file) {
      throw new ApplicationError("No file uploaded", 400);
    }

    if (file.mimetype !== "text/csv" || !file.originalname.endsWith(".csv")) {
      throw new ApplicationError("Please upload CSV files only", 400);
    }

    next();
  } catch (error) {
    next(error);
  }
};
