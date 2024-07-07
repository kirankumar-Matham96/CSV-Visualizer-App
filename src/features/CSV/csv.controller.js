import { CSVRepository } from "./csv.repository.js";
import fs from "fs";
import csv from "csv-parser";

export class CSVController {
  constructor() {
    this.fileRepository = new CSVRepository();
  }

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

  getFileById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const file = await this.fileRepository.get(id);
      res.status(200).json({ success: true, file });
    } catch (error) {
      next(error);
    }
  };

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
