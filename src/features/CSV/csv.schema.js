import mongoose from "mongoose";

const CSVSchema = mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: new Date(),
  },
  originalName: {
    type: String,
    required: true,
  },
  data: {
    type: [Map],
    of: String,
  },
});

export const CSVModel = new mongoose.model("CSV_Files", CSVSchema);
