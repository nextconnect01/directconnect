import express from "express";
import {
    createUpdatedUsers,
    forgetPassword,
    login,
    logout,
    rateFreelancer,
    register,
    resetPassword,
    setPasswordForGoogleUser,
    suggestedFreelancer,
    updateFileUploads,
    updatePassword,
    updateProfileDetails,
    updateUserRole,
    verifyEmail,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { multiUpload } from "../middleware/multer.middleware.js";
import { applyAsMentor, getMentorship } from "../controllers/mentorship.controller.js";
import { applyAsHiringAssistant, changeStatus, getAllHiringAssistant } from "../controllers/hiringAssistant.controller.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/forget-password").post(forgetPassword);
router.route("/recover-password").post(resetPassword)
router.route("/verify-email").get(verifyEmail)

// Safe Route or Authenticated Route
router.route("/changeHiringStatus/:id").post(isAuthenticated,changeStatus)
router.route("/getHiringAssistants").get(isAuthenticated,getAllHiringAssistant)
router.route("/applyHiringAssistant").post(isAuthenticated,applyAsHiringAssistant)
router.route("/userToUpdate").post(isAuthenticated,createUpdatedUsers)
router.route("/applyAsMentor").post(isAuthenticated,applyAsMentor)
router.route("/getMentorship").get(isAuthenticated,getMentorship)
router.route("/giveReview/:id").post(isAuthenticated,rateFreelancer)
router.route("/updateProfile").post(isAuthenticated, updateProfileDetails);
router.route("/suggestedFreelancers").get(isAuthenticated,suggestedFreelancer)
router.route("/updateFiles").post(isAuthenticated, multiUpload, updateFileUploads);
router.route("/changePassword").post(isAuthenticated, updatePassword);
router.route("/updateRole").post(isAuthenticated,updateUserRole)
router.route("/set-password").put(isAuthenticated,setPasswordForGoogleUser)

router.route("/profile").get(isAuthenticated, (req, res) => {
    if (req.user) {
        return res.status(200).json({
            success: true,
            user: req.user,
        });
    } else {
        return res.status(200).json({ // Changed from 401 to 200
            success: false,
            user: null,
        });
    }
});

// Add the /me route
router.route("/me").get((req, res) => {
    if (req.isAuthenticated()) {
        return res.status(200).json({
            success: true,
            user: req.user,
        });
    } else if (req.headers.authorization) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return res.status(200).json({
                success: true,
                user: decoded,
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }
    } else {
        return res.status(401).json({
            success: false,
            message: "Not logged in",
        });
    }
});

export default router;
