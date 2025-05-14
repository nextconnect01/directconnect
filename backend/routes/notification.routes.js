import express from "express"
import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { deleteSingleNotification, deleteUsersAllNotifications, getUserAllNotifications, getUserUnreadNotifications, markAllUsersNotification, markSingleNotification } from "../controllers/notification.controller.js"

const router = express.Router()

router.route("/getNotifications").get(isAuthenticated,getUserAllNotifications)
router.route("/getUnreadNotifications").get(isAuthenticated,getUserUnreadNotifications)
router.route("/deleteSingleNotification/:id").delete(isAuthenticated,deleteSingleNotification)
router.route("/deleteUsersAllNotifications").delete(isAuthenticated,deleteUsersAllNotifications)
router.route("/markSingleNotification/:id").get(isAuthenticated,markSingleNotification)
router.route("/markUsersAllNotifications").get(isAuthenticated,markAllUsersNotification)
export default router