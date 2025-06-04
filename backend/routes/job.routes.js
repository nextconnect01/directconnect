import express from "express"
import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { acceptWork, adminAlljobs, allJobs, confirmProposedJob, createJob, createProposalJob, deleteJob, editProposedJob, getClientAllJobs, getJobById, incompleteWork, markJobAsCompleted, newAllJobs, raiseJobDispute, reviewChanges, submitWork, updateJob, updatePausedJobStatus, viewJobProposal } from "../controllers/job.controller.js"
import { uploadWorkFiles } from "../middleware/uploadWorkFiles.js"

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
router.route("/submitWork/:id").post(isAuthenticated,uploadWorkFiles,submitWork)
router.route("/reviewWork/:id").post(isAuthenticated,reviewChanges)
router.route("/acceptWork/:id").get(isAuthenticated,acceptWork)
router.route("/incompleteWork/:id").get(isAuthenticated,incompleteWork)
router.route("/:id/feedBackStatus").put(isAuthenticated,updatePausedJobStatus)
router.route("/:id/disputedJob").put(isAuthenticated,raiseJobDispute)
router.route("/newAllJobs").get(newAllJobs)

export default router