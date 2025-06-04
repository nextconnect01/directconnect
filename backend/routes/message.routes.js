import express from "express"
import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { multiUpload } from "../middleware/multer.middleware.js"
import { deleteConversation, deleteMessage, getClientContacts, getMessage, sendMessage } from "../controllers/message.controller.js"

const router = express.Router()

router.route("/sendMessage/:id").post(isAuthenticated,multiUpload,sendMessage)
router.route("/deleteMessage/:id").delete(isAuthenticated,deleteMessage)
router.route("/deleteConversation/:id").delete(isAuthenticated,deleteConversation)
router.route("/getMessage/:id").get(isAuthenticated,getMessage)
router.get("/getClientContacts", isAuthenticated, getClientContacts);


export default router