import { CSVRepository } from "./csv.repository.js";
import fs from "fs";
import csv from "csv-parser";

export class CSVController {
  constructor() {
    this.fileRepository = new CSVRepository();
  }

  /**
   * To upload new file
   * @param {request} req
   * @param {response} res
   * @param {next middleware} next
   */
  addFile = async (req, res, next) => {
    try {
      const fullData = [];
      let newFile = {};

      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("data", (data) => fullData.push(data))
        .on("end", async () => {
          console.log(fullData);
          newFile = await this.fileRepository.add({
            fileName: req.file.originalname.split(".")[0],
            originalName: req.file.originalname,
            data: fullData,
          });

          // delete the local file
          fs.unlinkSync(req.file.path);

          res.status(201).json({
            success: true,
            message: "file saved successfully!",
            data: newFile,
          });
        });
    } catch (error) {
      next(error);
    }
  };

  /**
   * To get all the files
   * @param {request} req
   * @param {response} res
   * @param {next middleware} next
   */
  getFiles = async (req, res, next) => {
    try {
      const files = await this.fileRepository.getAll();
      res.status(200).json({
        success: true,
        files,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * To get the file by an id.
   * Included pagination.
   * @param {request} req
   * @param {response} res
   * @param {next middleware} next
   */
  getFileById = async (req, res, next) => {
    try {
      const { page } = req.query;
      const { id } = req.params;
      const file = await this.fileRepository.get(id);
      let offset = 0;
      let limit = 100;
      if (page) {
        offset = (page - 1) * 100;
        limit *= page;
      }

      // pagination
      const paginatedFile = {};
      paginatedFile.data = file.data.slice(offset, limit);

      res.status(200).json({
        success: true,
        file: paginatedFile,
        totalItems: file.data.length,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * To delete the file by an id
   * @param {request} req
   * @param {response} res
   * @param {next middleware} next
   */
  deleteFileById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedFile = await this.fileRepository.delete(id);
      res.status(200).json({
        success: true,
        message: `file: ${deletedFile.fileName} - deleted successfully`,
      });
    } catch (error) {
      next(error);
    }
  };
}
