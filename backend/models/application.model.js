import mongoose, { Schema } from "mongoose";

const applicationSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["accepted", "rejected", "pending"],
      default: "pending",
    },
    applicant: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        coverLetter: {
          type: String,
          required: true,
        },
        yourApproach: {
          type: String,
          required: true,
        },
        estimatedTimeLine: {
          type: String,
          required: true,
        },
        yourBid: {
          type: String,
          required: true,
        },
        portfolio: {
          type: String, // Assuming it's a link
        },
        questionsForClient: {
          type: String,
        },
        paymentDeliveryTerms: {
          type: String,
        },
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    job: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
  },
  { timestamps: true }
);

export const Application = mongoose.model("Application", applicationSchema);
