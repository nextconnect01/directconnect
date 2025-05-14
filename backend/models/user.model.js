import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: function () {
        return !this.googleId; // Required only if googleId is not provided
      },
    },
    username: {
      type: String,
      required: function () {
        return !this.googleId; // Required only if googleId is not provided
      },
      unique: true,
    },
    role: {
      type: String,
      enum: ["freelancer", "client", "admin"],
      default: "freelancer",
    },
    email: {
      type: String,
      required: function () {
        return !this.googleId; // Required only if googleId is not provided
      },
      unique: true, // Ensures unique emails across all users
      validate: {
        validator: function (value) {
          // Regex for validating email format
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // Required only if googleId is not provided
      },
    },
    verified: { type: Boolean, default: false },
    verificationToken: { type: String },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    isGoogleUser: {
      type: Boolean,
      default: function () {
        return !!this.googleId;
      },
    },
    hasPassword: {
      type: Boolean,
      default: false, // Google users won’t have a password initially
    },
    profile: {
      bio: { type: String },
      profilePhoto: {
        type: String,
        default: "",
      },
      languages: {
        type: [String],
        default: [],
      },
      professionalTitle: { type: String },
    },
    mentor: {
      type: Boolean,
      default: false,
    },
    skillProfile: {
      category: { type: String },
      subCategory: [{ type: String, default: [] }],
      resume: { type: String },
      resumeOriginalName: { type: String },
    },
    connectedFreelancers: [
      {
        freelancer: { type: Schema.Types.ObjectId, ref: "User" },
        connectedAt: { type: Date, default: Date.now },
      },
    ],
    rejectedJobs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Job",
        default: 0,
      },
    ],
    proposalsSent: [
      {
        type: Schema.Types.ObjectId,
        ref: "Application",
        default: 0,
      },
    ],
    activeJobs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Job",
        default: 0,
      },
    ],
    yourRating: [
      {
        client: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
        },
        feedback: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
