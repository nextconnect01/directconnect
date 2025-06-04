import mongoose from "mongoose";
import { config } from "dotenv";
import { User } from "../models/user.model.js";

// Load environment variables
config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("Connection failed:", err);
    process.exit(1);
  });

const fixHiringAssistantField = async () => {
  try {
    // Find all freelancer users where hiringAssistantStatus is of type Boolean (i.e. legacy data)
    const updateResult = await User.updateMany(
      {
        role: "freelancer",
        hiringAssistantStatus: { $type: "bool" }
      },
      {
        $set: { hiringAssistantStatus: "Inactive" }
      }
    );

    console.log(`Updated ${updateResult.modifiedCount} freelancer users to hiringAssistantStatus: "Inactive"`);
  } catch (error) {
    console.error("Error updating users:", error);
  } finally {
    mongoose.disconnect();
  }
};

fixHiringAssistantField();
