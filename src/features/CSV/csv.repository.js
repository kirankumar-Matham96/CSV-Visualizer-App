import { CSVModel } from "./csv.schema.js";
import { ApplicationError } from "../../middlewares/errorHandler.middleware.js";

export class CSVRepository {
  /**
   * To add the file to DB
   * @param {data object} data 
   */
  add = async (data) => {
    try {
      const newDoc = new CSVModel(data);
      await newDoc.save();
    } catch (error) {
      throw error;
    }
  };

  /**
   * To get the file by id
   * @param {file id} fileId 
   * @returns Object
   */
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

  /**
   * To get all the files
   * @returns Object - Array
   */
  getAll = async () => {
    try {
      const data = await CSVModel.find();
      return data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * To delete the file by id
   * @param {file id} fileId 
   * @returns Object
   */
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
