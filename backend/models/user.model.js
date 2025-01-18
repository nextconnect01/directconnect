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
    role : {
      type : String,
      enum : ["freelancer","client","admin"],
      default : "freelancer",
      
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
        message: props => `${props.value} is not a valid email address!`
      } 
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // Required only if googleId is not provided
      },
    },
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
      languages: [{ type: String, default: [] }],
      professionalTitle: { type: String },
    },
    skillProfile: {
      category: { type: String },
      subCategory: [{ type: String, default: [] }],
      resume: { type: String },
      resumeOriginalName: { type: String },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
