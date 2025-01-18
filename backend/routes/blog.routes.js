import express from "express"
import { allBlog, createBlog, deleteBlog, getBlogById, updateBlog } from "../controllers/blog.controller.js"
import { multiUpload } from "../middleware/multer.middleware.js"
import { isAuthenticated } from "../middleware/isAuthenticated.js";


const router = express.Router()

router.route("/createBlog").post(isAuthenticated,multiUpload,createBlog)
router.route("/deleteBlog/:id").delete(isAuthenticated,deleteBlog)
router.route("/updateBlog/:id").put(isAuthenticated,multiUpload,updateBlog)
router.route("/getAllBlog").get(isAuthenticated,allBlog)
router.route("/getBlogById/:id").get(isAuthenticated,getBlogById)
export default router