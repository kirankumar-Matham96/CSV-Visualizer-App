import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log("Connected to DB...");
  } catch (error) {
    console.log(error);
  }
};
