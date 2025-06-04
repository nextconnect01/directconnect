import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../db/datauriparser.js";
import cloudinary from "../db/cloudinary.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { google } from "googleapis";
import validator from "validator";
import disposableEmailDomains from "disposable-email-domains/index.json" assert { type: "json" };
import { Job } from "../models/job.models.js";
import { Notification } from "../models/notification.models.js";
import { getRecieverSocketId, io } from "../socket.js";
import { UpdatedUser } from "../models/updatedUsers.models.js";
import { Rank } from "../models/rank.model.js";

const blockedDomains = [
  "chansd.com",
  "cyclelove.cc",
  "imagepoet.net",
  "polkaroad.net",
  "teleg.eu",
  "azuretechtalk.net",
  "thetechnext.net",
  "logsmarter.net",
  "thetechnext.net",
  "vvtxiy.com",
  "gufum.com",
  "freesourcecodes.com",
  "koletter.com",
  "opemails.com",
  "zod.edu.pl",
  "instantletter.net",
  "psnator.com",
  "vibzi.com",
  "tempmailto.org",
  "machunu.com",
  "temp-inbox.me",
  "tempmail.us.com",
  "upsnab.net",
  "tozya.com",
  "finestudio.org",
  "1secmail.com",
  "1secmail.org",
  "1secmail.net",
  "rteet.com",
  "dpptd.com",
];

const isTemporaryEmail = (email) => {
  const domain = email.split("@")[1];
  console.log("Checking domain: ", domain); // Add logging to debug
  return (
    blockedDomains.includes(domain) || disposableEmailDomains.includes(domain)
  );
};

export const register = async (req, res) => {
  try {
    let { username, fullName, email, password, role } = req.body;

    if (!username || !fullName || !email || !password || !role) {
      return res.status(400).json({
        message: "Fill All the Fields during registration",
        success: false,
      });
    }

    //Validating email
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid Email Address",
      });
    }

    //Checking for disposable email

    const domain = email.split("@")[1];
    if (disposableEmailDomains.includes(domain)) {
      return res.status(400).json({
        message: "Temporary Email Address",
        success: false,
      });
    }

    //Check for temp mail from the given list of domains

    if (isTemporaryEmail(email)) {
      return res.status(400).json({
        message: "Temp Mail Are Not Allowed",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "user with this email is already registered",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
      role,
      verified: false,
      verificationToken,
    });

    await Rank.create({
      userDetails: user._id,
    });

    const verificationLink = `${process.env.BACKEND_URL}/api/v1/user/verify-email?token=${verificationToken}`;
    await sendVerificationEmail(email, verificationLink);

    return res.status(201).json({
      message: "Account Created Successfuly",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An Error Occured in try block",
      success: false,
    });
  }
};

const sendVerificationEmail = async (email, verificationLink) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_NEXTCONNECTHUB,
        pass: process.env.PASSWORD_NEXTCONNECTHUB,
      },
    });
    const mailOptions = {
      from: "nextconnecthub@gmail.com",
      to: email,
      subject: "Verify Your Email",
      html: `<p>Click the link below to verify your email address:</p>
           <a href="${verificationLink}">Verify Email</a>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send verification email.");
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token.",
        success: false,
      });
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    return res.redirect(`${process.env.CLIENT_URL}/editProfile`);
  } catch (error) {
    return res.status(500).json({
      message: "An Error Occurred",
      success: false,
    });
  }
};
export const login = async (req, res) => {
  try {
    let { email, password, role } = req.body;
    if (!role) {
      role = "freelancer";
    }
    if (!email || !password) {
      return res.status(400).json({
        message: "Something is missing while login",
        success: false,
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email address!" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        message: "Incorrect Email or Password",
        success: false,
      });
    }

    if (!existingUser.verified) {
      return res.status(403).json({
        message: "Please verify your email before logging in.",
        success: false,
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Incorrect Email or Password",
        success: false,
      });
    }

    const tokenData = {
      userId: existingUser._id,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const user = {
      _id: existingUser._id,
      fullName: existingUser.fullName,
      email: existingUser.email,
      role: existingUser.role,

      username: existingUser.username,
      activeJob: existingUser.activeJobs,

      proposalsSent: existingUser.proposalsSent,
      profilePhoto: existingUser.profile?.profilePhoto, // Access profilePhoto from profile
      bio: existingUser.profile?.bio, // Include bio from profile
      languages: existingUser.profile?.languages, // Include languages from profile
      professionalTitle: existingUser.profile?.professionalTitle, // Include professional title
      resume: existingUser.skillProfile?.resume, // Access resume from skillProfile
      resumeOriginalName: existingUser.skillProfile?.resumeOriginalName,
      category: existingUser.skillProfile?.category, // Access category from skillProfile
      subCategory: existingUser.skillProfile?.subCategory, // Access subCategory from skillProfile,
      hiringAssistantStatus: existingUser?.hiringAssistantStatus,
      projectCompleted : existingUser?.projectCompleted
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome Back ${user.fullName}`,
        user,
        success: true,
        token,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An Error Occured in try block",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    // Session-based logout (for Passport.js sessions)
    if (req.isAuthenticated()) {
      req.logout((err) => {
        if (err) {
          return res.status(500).json({
            message: "Error while logging out from session",
            success: false,
          });
        }
        return res.status(200).json({
          message: "Logged out successfully (session-based)",
          success: true,
        });
      });
    }
    // Token-based logout (clear the JWT token cookie)
    else if (req.cookies.token) {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "lax",
      });
      return res.status(200).json({
        message: "Logged out successfully (token-based)",
        success: true,
      });
    }
    // If neither session nor token exists
    else {
      return res.status(400).json({
        message: "User is not logged in",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while logging out",
      success: false,
    });
  }
};

export const getCurrentUser = (req, res) => {
  try {
    if (req.isAuthenticated()) {
      return res.status(200).json({
        success: true,
        user: req.user, // User from the session
      });
    }

    return res.status(401).json({
      success: false,
      message: "User not logged in",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the user",
    });
  }
};

export const updateProfileDetails = async (req, res) => {
  try {
    const {
      email,
      fullName,
      bio,
      languages,
      professionalTitle,
      category,
      subCategory,
      uspSkill
    } = req.body;

    // Determine user ID from JWT or Google session
    const userId = req.id || req.user?._id || req.session?.passport?.user;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }

    // Find the user by ID
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Update user details
    if (fullName) existingUser.fullName = fullName;
    if (email) existingUser.email = email;
    if (bio) existingUser.profile.bio = bio;
    if (professionalTitle)
      existingUser.profile.professionalTitle = professionalTitle;
    if (category) existingUser.skillProfile.category = category;
    if (languages) existingUser.profile.languages = languages;
    if (subCategory) existingUser.skillProfile.subCategory = subCategory;
if (uspSkill) existingUser.skillProfile.uspSkill = uspSkill.slice(0, 2);

    // Save updated user
    await existingUser.save();

    return res.status(200).json({
      success: true,
      message: "Profile details updated successfully",
      user: {
        _id: existingUser._id,
        fullName: existingUser.fullName,
        email: existingUser.email,
        username: existingUser.username,
        profilePhoto: existingUser.profile?.profilePhoto,
        bio: existingUser.profile?.bio,
        languages: existingUser.profile?.languages,
        professionalTitle: existingUser.profile?.professionalTitle,
        resume: existingUser.skillProfile?.resume,
        category: existingUser.skillProfile?.category,
        subCategory: existingUser.skillProfile?.subCategory,
        uspSkill : existingUser?.skillProfile?.uspSkill,
        role: existingUser?.role,
      },
    });
  } catch (error) {
    console.error("Error updating profile details:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating profile details",
    });
  }
};

export const updateFileUploads = async (req, res) => {
  try {
    const profilePhoto = req.files?.profilePhoto?.[0];
    const resume = req.files?.resume?.[0];
    const userId = req.id || req.user?._id || req.session?.passport?.user;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is missing",
        success: false,
      });
    }

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    // Upload Profile Photo
    if (profilePhoto) {
      try {
        const profilePhotoUri = getDataUri(profilePhoto);
        const profilePictureCloud = await cloudinary.uploader.upload(
          profilePhotoUri.content,
          {
            resource_type: "auto",
            public_id: `profile_photo/${Date.now()}`,
            access_mode: "public",
          }
        );
        existingUser.profile.profilePhoto = profilePictureCloud.secure_url;
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: "Error uploading profile photo",
          success: false,
        });
      }
    }

    // Upload Resume
    if (resume) {
      try {
        const resumeUri = getDataUri(resume);
        const resumeCloud = await cloudinary.uploader.upload(
          resumeUri.content,
          {
            resource_type: "auto",
            public_id: `resume/${Date.now()}`,
            access_mode: "public",
          }
        );
        existingUser.skillProfile.resume = resumeCloud.secure_url;
        existingUser.skillProfile.resumeOriginalName = resume.originalname;
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: "Error uploading resume",
          success: false,
        });
      }
    }

    await existingUser.save();

    const user = {
      _id: existingUser._id,
      fullName: existingUser.fullName,
      email: existingUser.email,
      role : existingUser.role,
      username: existingUser.username,
      profilePhoto: existingUser.profile?.profilePhoto,
      bio: existingUser.profile?.bio,
      languages: existingUser.profile?.languages,
      professionalTitle: existingUser.profile?.professionalTitle,
      resume: existingUser.skillProfile?.resume,
      resumeOriginalName: existingUser.skillProfile?.resumeOriginalName,
      category: existingUser.skillProfile?.category,
      subCategory: existingUser.skillProfile?.subCategory,
    };

    return res.status(200).json({
      message: "Files updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred in try block",
      success: false,
    });
  }
};

// When user is logged in then ye controller
export const updatePassword = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.id;

    let existingUser = await User.findById(userId);
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    if (existingUser.googleId) {
      return res.status(400).json({
        message: "Cannot update password for Google login users",
        success: false,
      });
    }

    if (!password || password.trim() === "") {
      return res
        .status(400)
        .json({ message: "Password cannot be empty", success: false });
    }
    if (password) {
      existingUser.password = await bcrypt.hash(password, 10);
      await existingUser.save();
      return res
        .status(200)
        .json({ message: "Password updated successfully", success: true });
    } else {
      return res
        .status(400)
        .json({ message: "Password is required", success: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while updating the password",
      success: false,
    });
  }
};

//When is user is logged in then ye use hoga agar google user ko password create karna h new
export const setPasswordForGoogleUser = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.id; // Assumes the user is authenticated via session

    // Validate password
    if (!password || password.trim() === "") {
      return res
        .status(400)
        .json({ message: "Password cannot be empty", success: false });
    }

    let existingUser = await User.findById(userId);
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    // Ensure the user is a Google login user
    if (!existingUser.googleId) {
      return res.status(400).json({
        message: "This endpoint is for Google login users only",
        success: false,
      });
    }

    // Check if the user already has a password set
    if (existingUser.hasPassword) {
      return res.status(400).json({
        message:
          "Password already set. Use the update password endpoint instead.",
        success: false,
      });
    }

    // Hash and set the new password
    existingUser.password = await bcrypt.hash(password, 10);
    existingUser.hasPassword = true; // Update the flag to indicate the user now has a password
    await existingUser.save();

    return res
      .status(200)
      .json({ message: "Password set successfully", success: true });
  } catch (error) {
    console.error("Error setting password for Google user:", error.message);
    return res
      .status(500)
      .json({ message: "An error occurred while setting the password" });
  }
};

//Isko user kr ke mail pr request jaegi reset link jaegi
export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Please Fill The email Address",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        message: "No USER Exist with this email",
      });
    }

    const tokenData = { userId: existingUser._id };
    const resetToken = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_DIRECTCONNECT,
        pass: process.env.PASSWORD_DIRECTCONNECT,
      },
    });

    const mailOptions = {
      from: `DIRECT CONNECT ${process.env.EMAIL_DIRECTCONNECT}`,
      to: existingUser.email,
      subject: "Password Reset Request",
      html: `
          <h2>Password Reset</h2>
          <p>Hi ${existingUser.fullName},</p>
          <p>We received a request to reset your password. Click the link below to reset it:</p>
          <a href="${process.env.CLIENT_URL}/recover-password/${resetToken}">Reset Password</a>
          <p>If you did not request this, please ignore this email.</p>
          <p>Thanks,</p>
          <p>Your App Team</p>
        `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: "Password reset request sent",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "An error occured while processing the request ",
      success: false,
    });
  }
};

//finally jab link ko khola jaega tab is controller ki madad se password reset hoga
export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        message: "Password is missing from the request body",
        success: false,
      });
    }

    const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the Authorization header

    if (!token) {
      return res
        .status(400)
        .json({ message: "Token is missing", success: false });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify the token
    const userId = decoded.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    user.password = hashedPassword; // Update the password
    await user.save();

    return res
      .status(200)
      .json({ message: "Password successfully reset", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Invalid or expired token", success: false });
  }
};

export const connectedFreelancer = async (req, res) => {
  const userId = req.id;
};

export const suggestedFreelancer = async (req, res) => {
  try {
    const suggestedUsers = await User.find({
      _id: { $ne: req.id },
      role: "freelancer",
    }).select("-password");
    if (!suggestedUsers) {
      return res.status(404).json({
        message: "No Suggested Users Present at the moment",
        success: true,
        users: [],
      });
    }

    return res.status(200).json({
      message: "Suggested Users Found",
      success: true,
      users: suggestedUsers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const rateFreelancer = async (req, res) => {
  try {
    const clientId = req.id;
    const client = await User.findById(clientId);
    if (!client) {
      return res.status(404).json({
        message: "No such client found",
        success: false,
      });
    }

    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "No such job found",
        success: false,
      });
    }

    const freelancerId = job.freelancerAccepted;
    const { rating, feedback } = req.body;

    if (!rating || !feedback) {
      return res.status(400).json({
        message: "You have to fill both rating and feedback",
        success: false,
      });
    }

    // Optional: Prevent duplicate rating from same client
    const freelancer = await User.findOne({
      _id: freelancerId,
      "yourRating.client": clientId,
      "yourRating.job": jobId,
    });

    if (freelancer) {
      return res.status(400).json({
        message: "You have already rated this freelancer",
        success: false,
      });
    }

    await User.findByIdAndUpdate(freelancerId, {
      $push: {
        yourRating: {
          client: clientId,
          job: jobId,
          rating,
          feedback,
        },
      },
    });

    const notification = await Notification.create({
      sendersDetail: clientId,
      recieversDetail: freelancerId,
      category: "Rating",
      message: `${client?.fullName} has rated your profile`,
    });

    const recieverSocketId = getRecieverSocketId(freelancerId);
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("notification", notification);
      console.log("Client has rated Freelancer", notification);
    }
    return res.status(200).json({
      message: "Feedback Given",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const createUpdatedUsers = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "No Such User Found",
        success: false,
      });
    }

    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Email Not Filled",
        success: false,
      });
    }

    const updatedUser = await UpdatedUser.create({
      email,
      fullName: user?.fullName,
      role: user?.role,
    });

    return res.status(201).json({
      message: "User To Be Updated Added Successfully",
      success: true,
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};


export const updateUserRole = async (req,res) => {
  try {
    const {userId,role} = req.body;
    const user = await User.findByIdAndUpdate(userId,{role},{new : true})
    if(!user){
      return res.status(404).json({
        message : "User Not Found",
        success : false
      })
    }
    return res.status(200).json({
      message : "User Role Updated",
      success : true,
      user
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message : "Internal Server Error",
      success : true
    })
    
  }
}