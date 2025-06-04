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

const resetUserArrays = async () => {
  try {
    const users = await User.find({});
    let updatedCount = 0;

    for (const user of users) {
      let updated = false;

      if (user.proposalsSent) {
        user.proposalsSent = [];
        updated = true;
      }

      if (user.rejectedJobs) {
        user.rejectedJobs = [];
        updated = true;
      }

      if (user.activeJobs) {
        user.activeJobs = [];
        updated = true;
      }

      if (user.yourRating) {
        user.yourRating = [];
        updated = true;
      }

      if (user.role === "freelancer" && user.connectedClient) {
        user.connectedClient = [];
        updated = true;
      }

      if (user.role === "client" && user.connectedFreelancers) {
        user.connectedFreelancers = [];
        updated = true;
      }

      if (updated) {
        await user.save();
        updatedCount++;
        console.log(`Updated user: ${user._id}`);
      }
    }

    console.log(`✅ Finished updating users. Total updated: ${updatedCount}`);
  } catch (error) {
    console.error("❌ Error updating users:", error);
  } finally {
    mongoose.disconnect();
  }
};

resetUserArrays();
