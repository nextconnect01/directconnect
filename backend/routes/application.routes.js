import express from "express"
import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { applyJob, getAcceptedJobs, getApplicant, getAppliedJobs, updateApplication, updateStatus } from "../controllers/application.controller.js"
const router = express.Router()

router.route("/applyJobs/:id").post(isAuthenticated,applyJob)
router.route("/updateApplication/:id").post(isAuthenticated,updateApplication)
router.route("/getApplicants/:id").get(isAuthenticated,getApplicant)
router.route("/getAppliedJobs").get(isAuthenticated,getAppliedJobs)
router.route("/updateStatus/:id").post(isAuthenticated,updateStatus)
router.route("/getAcceptedJobs").get(isAuthenticated,getAcceptedJobs)

export default router