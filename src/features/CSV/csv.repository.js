import { CSVModel } from "./csv.schema.js";
import { ApplicationError } from "../../middlewares/errorHandler.middleware.js";

export class CSVRepository {
  add = async (data) => {
    try {
      const newDoc = new CSVModel(data);
      await newDoc.save();
    } catch (error) {
      throw error;
    }
  };

  get = async (fileId) => {
    try {
      const data = await CSVModel.findById(fileId);

      if (!data) {
        throw new ApplicationError("file not found", 404);
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  getAll = async () => {
    try {
      const data = await CSVModel.find();
      return data;
    } catch (error) {
      throw error;
    }
  };

  delete = async (fileId) => {
    try {
      const data = await CSVModel.findByIdAndDelete(fileId);

      if (!data) {
        throw new ApplicationError("file not found", 404);
      }

      return data;
    } catch (error) {
      throw error;
    }
  };
}
