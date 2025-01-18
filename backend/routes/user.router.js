import express from "express";
import {
    forgetPassword,
    login,
    logout,
    register,
    resetPassword,
    setPasswordForGoogleUser,
    updateFileUploads,
    updatePassword,
    updateProfileDetails,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { multiUpload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/forget-password").post(forgetPassword);
router.route("/recover-password").post(resetPassword)

// Safe Route or Authenticated Route
router.route("/updateProfile").post(isAuthenticated, multiUpload, updateProfileDetails);
router.route("/updateFiles").post(isAuthenticated, multiUpload, updateFileUploads);
router.route("/changePassword").post(isAuthenticated, updatePassword);

router.route("/set-password").put(isAuthenticated,setPasswordForGoogleUser)

router.route("/profile").get(isAuthenticated, (req, res) => {
    if (req.user) {
        return res.status(200).json({
            success: true,
            user: req.user,
        });
    } else {
        return res.status(401).json({
            success: false,
            message: "Unauthorized. Please log in.",
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
