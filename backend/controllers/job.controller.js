import { Conversation } from "../models/conversation.model.js";
import { Job } from "../models/job.models.js";
import { Message } from "../models/message.model.js";
import { Notification } from "../models/notification.models.js";
import { User } from "../models/user.model.js";
import { getRecieverSocketId, io } from "../socket.js";

export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      salary,
      duration,
      skills,
      rank,
      jobType,
      applicationDeadline,
      budgetType,
      category,
    } = req.body;
    const ownerId = req.id;
    if (!ownerId) {
      return res.status(401).json({
        message: "Not Authenticated",
        success: false,
      });
    }
    if (
      !title ||
      !description ||
      !salary ||
      !duration ||
      !skills ||
      !rank ||
      !applicationDeadline ||
      !budgetType ||
      !category ||
      !jobType
    ) {
      return res.status(404).json({
        message: "Something is Missing",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      duration,
      salary,
      rank,
      skills,
      owner: ownerId,
      applicationDeadline,
      budgetType,
      category,
      jobType,
    });

    if (!job) {
      return res.status(400).json({
        message: "Job Not Created",
        success: false,
      });
    }

    return res.status(201).json({
      message: "Job Created Successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const createProposalJob = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    const otherUser = req.params.id;
    if (!user) {
      return res.status(404).json({
        message: "No such user exist",
        success: false,
      });
    }

    const { title, description, delivarables, salary, duration, budgetType } =
      req.body;
    if (
      !title ||
      !description ||
      !delivarables ||
      !salary ||
      !duration ||
      !budgetType
    ) {
      return res.status(400).json({
        message: "Something is Missing",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      delivarables,
      salary,
      duration,
      budgetType,
    });

    if (!job) {
      return res.status(404).json({
        message: "No such job is created",
        success: false,
      });
    }

    if (user?.role === "client") {
      job.owner = userId;
      job.freelancerAccepted = otherUser;

      const notification = await Notification.create({
        sendersDetail : userId,
        recieversDetail : otherUser,
        category : "Proposals",
        message : `${user?.fullName} sent you a job proposal`
      })

      const recieverSocketId = getRecieverSocketId(otherUser)
      if(recieverSocketId){
       
        io.to(recieverSocketId).emit('notification',notification)
      }



    } else {
      job.freelancerAccepted = userId
      job.owner = otherUser

      const notification = await Notification.create({
        sendersDetail : userId,
        recieversDetail : otherUser,
        category : "Proposals",
        message : `${user?.fullName} sent you a job proposal`
      })

      const recieverSocketId = getRecieverSocketId(otherUser)
      if(recieverSocketId){
       
        io.to(recieverSocketId).emit('notification',notification)
      }
    }

    
    job.status = "specific";
    await job.save();

    // 🔥 Create a new Message referring to this Job
    const message = await Message.create({
      sendersId: userId, // ✅ CORRECT field name
      recieversId: otherUser, // ✅ CORRECT field name
      message: "Project Brief Added", // ✅ CORRECT field name
      projectBrief: [job._id], // ✅ Job id
    });

    const populatedMessage = await Message.findById(message._id).populate(
      "projectBrief"
    );

    // 🔥 Push the Message into Conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [userId, otherUser] },
    });

    if (!conversation) {
      // If conversation doesn't exist yet, create one
      conversation = await Conversation.create({
        participants: [userId, otherUser],
        messages: [message._id],
      });
    } else {
      conversation.messages.push(message._id);
      await conversation.save();
    }


    return res.status(201).json({
      message: "Job and Message created successfully",
      success: true,
      job,
      messageData: populatedMessage, // optional if you want frontend to instantly update
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const editProposedJob = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "No Such User Found",
        success: false,
      });
    }
    const jobId = req.params.id;
    let job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "No Such Job Exists",
        success: false,
      });
    }

    const { title, description, delivarables, salary, duration, budgetType } =
      req.body;
    if (
      !title ||
      !description ||
      !delivarables ||
      !salary ||
      !duration ||
      !budgetType
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      {
        title,
        description,
        salary,
        budgetType,
        delivarables,
        duration,
      },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(400).json({
        message: "Job Could not be updated",
        success: false,
      });
    }

    const message = await Message.findOne({ projectBrief: jobId }).populate({
      path: "projectBrief",
    });

    if (!message) {
      return (
        res.status(404),
        json({
          message: "No such message found",
          success: false,
        })
      );
    }

    return res.status(200).json({
      message: "Job Updated Successfully",
      success: true,
      job: updatedJob,
      populatedMessage: message,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const viewJobProposal = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User Does Not Exist",
        success: false,
      });
    }

    const freelancersProposedJob = await Job.find({
      freelancerAccepted: userId,
    })
      .sort({ createdAt: -1 })
      .populate({ path: "application" }).populate({path:"owner"});
    if (freelancersProposedJob.length === 0) {
      return res.status(404).json({
        message: "No Proposal Available for the freelancer as of now",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Client Proposal Found",
      success: true,
      applications: freelancersProposedJob,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
export const confirmProposedJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id;
    const job = await Job.findById(jobId).populate({path : "owner"}).populate({path : "freelancerAccepted"});
    if (!job) {
      return res.status(404).json({
        message: "Job Not Found",
        success: false,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
        success: false,
      });
    }

    
    job.status = "progress";
    
    await Notification.create({
      sendersDetail : job?.owner,
      recieversDetail : job?.freelancerAccepted,
      category : "Proposals",
      message : `${job?.owner?.fullName} Accepted Your Job Proposal`
    })

    await job.save();
    return res.status(200).json({
      message: "Job Confirmed and in progress status now",
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

export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job noT Found",
        success: false,
      });
    }
    const {
      title,
      description,
      salary,
      duration,
      skills,
      rank,
      jobType,
      applicationDeadline,
      budgetType,
      category,
    } = req.body;

    if (job?.owner?._id.toString() !== userId) {
      return res.status(403).json({
        message: "You are not authorized to updated this job",
        success: false,
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(jobId, {
      title,
      description,
      salary,
      duration,
      skills,
      rank,
      jobType,
      applicationDeadline,
      budgetType,
      category,
    });

    return res.status(200).json({
      message: "Job updated successfully",
      success: true,
      job: updatedJob,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const ownerId = req.id;
    const jobId = req.params.id;
    let job = await Job.findOne({ _id: jobId, owner: ownerId });
    if (!job) {
      return res.status(404).json({
        message: "No Such Job Exist",
        success: false,
      });
    }

    await Job.deleteOne({ _id: jobId });

    return res.status(200).json({
      message: "Job Deleted Successfully",
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

export const adminAlljobs = async (req, res) => {
  try {
    const ownerId = req.id;
    const jobs = await Job.find({ owner: ownerId })
      .sort({ createdAt: -1 })
      .populate({ path: "owner" })
      .populate({
        path: "application",
        populate: {
          path: "applicant.user", // 👈 populate inside the applicant array
          model: "User", // 👈 explicitly mention the model
        },
      });

    if (!jobs) {
      return res.status(404).json({
        message: "No Job present for this user",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All the jobs of the user",
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: "false",
    });
  }
};

export const allJobs = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "",
      });
    }
    const keyword = req.query.keyword || "";
    const query = {
      $and: [
        { status: "active" },
        {
          _id: { $nin: user.rejectedJobs || [] }, // exclude rejected jobs
        },
        {
          $or: [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        },
      ],
    };

    const jobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .populate({ path: "owner" })
      .populate({ path: "application" });
    if (!jobs.length) {
      return res.status(400).json({
        message: "No Jobs found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Jobs Found",
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await User.findById(jobId).populate({ path: "application" });
    if (!job) {
      return res.status(404).json({
        message: "NO Such job found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "jOB Found",
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getClientAllJobs = async (req, res) => {
  try {
    const clientId = req.params.id;
    const jobs = await Job.find({ owner: clientId });
    if (jobs.length === 0) {
      return res.status(404).json({
        message: "NO jobs posted by this client",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All the jobs found",
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const markJobAsCompleted = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id;
    const job = await Job.findById(jobId).populate({ path: "owner" })
    if (!job) {
      return res.status(404).json({
        message: "No such job found",
        success: false,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "No Such User Found",
        success: false,
      });
    }

    if (user?.role === "freelancer") {
      job.status = "paused";
      await job.save();
      const notification = await Notification.create({
        sendersDetail : userId,
        recieversDetail : job?.owner?._id,
        category : "Job",
        message : `${user?.fullName} submitted his work for review for ${job?.title}`
      })
      const recieverSocketId = getRecieverSocketId(job?.owner?._id)
      if(recieverSocketId){
        io.to(recieverSocketId).emit("notification",notification)
        console.log("Freelancer Submitted his work", notification);

        
      }
      return res.status(200).json({
        message: "Job Submission For work Submission",
        success: true,
        job,
      });
      
    }

    if (user?.role === "client") {
      job.status = "completed";
      await job.save();
      const notification = await Notification.create({
        sendersDetail : userId,
        recieversDetail : job?.freelancerAccepted,
        category : "Job",
        message : `${user?.fullName} has accepted you work for ${job?.title}`
      })

      const recieverSocketId = getRecieverSocketId(job?.freelancerAccepted)
      if(recieverSocketId){
        io.to(recieverSocketId).emit('notification',notification)
        console.log("Client Accepted the work",notification);
        
      }
      return res.status(200).json({
        message: "Job Marked As Completed",
        success: true,
        job,
      });
    }

    return res.status(400).json({
      message: "You are not authorized to take this action",
      success: false,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server Error",
      success: false,
    });
  }
};

export const updatePausedJobStatus = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({ path: "owner" });
    if (!job) {
      return res.status(404).json({
        message: "No such job found",
        success: false,
      });
    }

    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "No Such User Found",
        success: false,
      });
    }

    if (job?.owner?._id.toString() !== userId) {
      return res.status(403).json({
        message: "You Are Not Authorized to make this action",
        success: false,
      });
    }
    const { action } = req.body;

    if (user?.role === "freelancer" && action === "sendForReview") {
      job.status = "paused";
    } else if (user?.role === "client" && action === "redo") {
      job.status = "progress";
      const notification  = await Notification.create({
        sendersDetail : userId,
        recieversDetail : job?.freelancerAccepted,
        category : "Job",
        message : `${user?.fullName} has reviewed your work ${job?.title} and has asked you for resubmission with improvements . You can ask more about this in chat `

      })

      const recieverSocketId = getRecieverSocketId(job?.freelancerAccepted)
      if(recieverSocketId){
        io.to(recieverSocketId).emit('notification',notification)
        console.log("Client has asked for resubmission of work",notification);
        
      }
    } else if (user?.role === "client" && action === "accept") {
      job.status = "completed";
      const freelancerId = job.freelancerAccepted;

      if (freelancerId) {
        await User.findByIdAndUpdate(freelancerId, {
          $pull: { activeJobs: job?._id },
        });
      }
    } else {
      return res.status(400).json({
        message: "Invalid action or role",
        success: false,
      });
    }

    await job.save();
    return res.status(200).json({
      message: `Job Status Updated to ${job?.status}`,
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const raiseJobDispute = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id;
    const job = await Job.findById(jobId).populate({ path: "owner" });
    if (!job) {
      return res.status(404).json({
        message: "No such job found",
        success: false,
      });
    }

    if (
      job.client.toString() !== userId &&
      job.freelancer.toString() !== userId
    ) {
      return res.status(403).json({
        message: "You are not authorized to raise a dispute",
        success: false,
      });
    }

    job.status = "disputes";

    await job.save();
    return res.status(200).json({
      message: "Job Status Updated to disputes",
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

export const recommendedJobs =  async() => {
  try {
    const userId =  req.id
    const user = await User.findById(userId)
    if(!user){
      return res.status(404).json({
        message : "No Such User Found",
        success : false
      })
    }

    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message : "Internal Server Error",
      success : false
    })
  }
}
