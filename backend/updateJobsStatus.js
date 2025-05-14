import mongoose from "mongoose";
import { Job } from "./models/job.models.js";

import dotenv from "dotenv";
dotenv.config()

const MONGO_URI = process.env.MONGO_URI 

const updateJobsStatus = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");

    const result = await Job.updateMany({}, { $set: { status: "progress" } });
    console.log(`Updated ${result.modifiedCount} jobs to 'progress'`);

    mongoose.connection.close(); // Close connection after updating
  } catch (error) {
    console.error("Error updating jobs:", error);
    mongoose.connection.close();
  }
};

updateJobsStatus();
