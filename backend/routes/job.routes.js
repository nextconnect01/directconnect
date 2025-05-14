import express from "express"
import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { adminAlljobs, allJobs, confirmProposedJob, createJob, createProposalJob, deleteJob, editProposedJob, getClientAllJobs, getJobById, markJobAsCompleted, raiseJobDispute, updateJob, updatePausedJobStatus, viewJobProposal } from "../controllers/job.controller.js"

const router = express.Router()

router.route("/postJob").post(isAuthenticated,createJob)
router.route("/proposeJob/:id").post(isAuthenticated,createProposalJob)
router.route("/viewJobProposal").get(isAuthenticated,viewJobProposal)
router.route("/updateProposedJob/:id").post(isAuthenticated,editProposedJob)
router.route("/confirmProposedJob/:id").get(isAuthenticated,confirmProposedJob)
router.route("/deleteJob/:id").delete(isAuthenticated,deleteJob)
router.route("/adminJobs").get(isAuthenticated,adminAlljobs)
router.route("/getAllJobs").get(isAuthenticated,allJobs)
router.route("/updateJob/:id").post(isAuthenticated,updateJob)
router.route("/jobById/:id").get(isAuthenticated,getJobById)
router.route("/clientJobs").get(isAuthenticated,getClientAllJobs)
router.route("/:id/completeJob").put(isAuthenticated,markJobAsCompleted)
router.route("/:id/feedBackStatus").put(isAuthenticated,updatePausedJobStatus)
router.route("/:id/disputedJob").put(isAuthenticated,raiseJobDispute)

export default router