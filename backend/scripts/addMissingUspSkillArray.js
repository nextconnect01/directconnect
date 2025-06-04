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

const addMissingUspSkillArray = async () => {
  try {
    const updateResult = await User.updateMany(
      {
        role: "freelancer",
        "skillProfile.uspSkill": { $exists: false }
      },
      {
        $set: { "skillProfile.uspSkill": [] }
      }
    );

    console.log(`✅ Updated ${updateResult.modifiedCount} freelancer users by adding an empty uspSkill array`);
  } catch (error) {
    console.error("❌ Error updating users:", error);
  } finally {
    mongoose.disconnect();
  }
};

addMissingUspSkillArray();
