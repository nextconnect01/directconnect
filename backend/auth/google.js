import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/v1/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Create a new user if not found
          user = await User.create({
            fullName: profile.displayName,
            email: profile.emails[0].value,
            role : null,
            username: profile.emails[0].value.split("@")[0],
            googleId: profile.id,
            isGoogleUser: true, // Explicitly set this field
            hasPassword: false, // Google users won't have a password initially
            profile: {
              profilePhoto: profile.photos[0]?.value || "",
            },
          });
        } else {
          // Ensure isGoogleUser and hasPassword are updated
          if (user.isGoogleUser !== true || user.hasPassword !== false) {
            user.isGoogleUser = true;
            user.hasPassword = false;
            await user.save(); // Save updated fields to the database
          }
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).lean(); // Use lean() to get a plain object
    if (!user) {
      return done(new Error("User not found"), null);
    }

    const completeUser = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role : user.role,
      username: user.username,
      profilePhoto: user.profile?.profilePhoto,
      bio: user.profile?.bio,
      languages: user.profile?.languages,
      professionalTitle: user.profile?.professionalTitle,
      resume: user.skillProfile?.resume,
      resumeOriginalName: user.skillProfile?.resumeOriginalName,
      category: user.skillProfile?.category,
      subCategory: user.skillProfile?.subCategory,
      projectCompleted : user?.projectCompleted,
      isGoogleUser: user.isGoogleUser, // Ensure this is included in the Redux store
      hasPassword: user.hasPassword,   // Ensure this is included in the Redux store
    };
        console.log("🧠 Deserialized User:", completeUser); // Add this


    done(null, completeUser); // Pass the complete user object to req.user
  } catch (error) {
    done(error, null);
  }
});

export default passport;
