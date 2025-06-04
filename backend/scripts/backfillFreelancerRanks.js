import mongoose from "mongoose";
import dotenv from "dotenv";
import { Rank } from "../models/rank.model.js";
import { User } from "../models/user.model.js";

dotenv.config();

const backfillFreelancerRanks = async () => {
  try {
    await mongoose.connect("mongodb+srv://directconnectinside:Karan12Samarth07gogo@cluster01.iudyx.mongodb.net/?retryWrites=true&w=majority&appName=cluster01", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");

    const freelancers = await User.find({ role: "freelancer" });

    let createdCount = 0;
    for (const user of freelancers) {
      const existingRank = await Rank.findOne({ userDetails: user._id });

      if (!existingRank) {
        await Rank.create({
          userDetails: user._id,
          // All other fields will use schema defaults
        });
        createdCount++;
      }
    }

    console.log(`✅ Successfully created ${createdCount} Rank documents.`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during rank backfill:", error);
    process.exit(1);
  }
};

backfillFreelancerRanks();
