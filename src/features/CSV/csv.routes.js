import { CSVController } from "./csv.controller.js";
import express from "express";
import { upload } from "../../middlewares/multer.middleware.js";

const csvController = new CSVController();

const router = express.Router();

router.post("/", upload.single("file"), csvController.addFile);
router.get("/", csvController.getFiles);
router.get("/:id", csvController.getFileById);
router.delete("/:id", csvController.deleteFileById);

export default router;
