import { Application } from "../models/application.model.js";
import { Job } from "../models/job.models.js";
import { Notification } from "../models/notification.models.js";
import { User } from "../models/user.model.js";
import { getRecieverSocketId, io } from "../socket.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    const {
      coverLetter,
      yourApproach,
      estimatedTimeLine,
      yourBid,
      portfolio,
      questionsForClient,
      paymentDeliveryTerms,
    } = req.body;

    // Basic validation for required fields
    if (!coverLetter || !yourApproach || !estimatedTimeLine || !yourBid) {
      return res.status(400).json({
        message: "Missing required fields",
        success: false,
      });
    }

    const job = await Job.findById(jobId).populate({path : "owner"});
    if (!job) {
      return res.status(404).json({
        message: "No such job found",
        success: false,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "No such user is found",
        success: false,
      });
    }

    // Check if user has already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      "applicant.user": userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "Already Applied For this job",
        success: false,
        job,
      });
    }

    // Create a new application with full applicant info
    const newApplication = await Application.create({
      applicant: [
        {
          user: userId,
          coverLetter,
          yourApproach,
          estimatedTimeLine,
          yourBid,
          portfolio,
          questionsForClient,
          paymentDeliveryTerms,
        },
      ],
      job: jobId,
      owner: job.owner, // If you're tracking who posted the job
    });

    // Add reference to user's proposals
    await User.findByIdAndUpdate(userId, {
      $addToSet: { proposalsSent: newApplication._id },
    });

    // Add reference to job's applications
    job.application.push(newApplication._id);
    await job.save();

    const notification = await Notification.create({
      sendersDetail : userId,
      recieversDetail : job?.owner?._id,
      category : "Job",
      message : `${user?.fullName} applied on ${job?.title} job`
    })

    const recieverSocketId = getRecieverSocketId(job?.owner?._id)
    if(recieverSocketId){
      io.to(recieverSocketId).emit('notification',notification)
      console.log("Apply for job notification" , notification);
      
    }

    
    return res.status(201).json({
      message: "Successfully Applied for the job",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const userId = req.id;
    const applicationId = req.params.id;
    const {
      coverLetter,
      yourApproach,
      estimatedTimeLine,
      yourBid,
      portfolio,
      questionsForClient,
      paymentDeliveryTerms,
    } = req.body;

    if (
      !coverLetter ||
      !yourApproach ||
      !estimatedTimeLine ||
      !yourBid ||
      !portfolio ||
      !questionsForClient ||
      !paymentDeliveryTerms
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "No such user found",
        success: false,
      });
    }

    const application = await Application.findById(applicationId)
      .populate({ path: "owner" })
      .populate({ path: "job" });

    if (!application) {
      return res.status(404).json({
        message: "No such Application found",
        success: false,
      });
    }

    // find the applicant belonging to the user
    const applicant = application.applicant.find(
      (app) => app.user.toString() === userId
    );

    if (!applicant) {
      return res.status(404).json({
        message: "No application submitted by this user",
        success: false,
      });
    }

    // update the applicant fields
    applicant.coverLetter = coverLetter;
    applicant.yourApproach = yourApproach;
    applicant.estimatedTimeLine = estimatedTimeLine;
    applicant.yourBid = yourBid;
    applicant.portfolio = portfolio;
    applicant.questionsForClient = questionsForClient;
    applicant.paymentDeliveryTerms = paymentDeliveryTerms;

    await application.save();

    return res.status(200).json({
      message: "Application Updated Successfully",
      success: true,
      application,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getApplicant = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: "application",
      option: { sorted: { createdBy: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "No such JOB found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Applicants Found",
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

export const updateStatus = async (req, res) => {
  try {
    const userId = req.id
    const user = await User.findById(userId)
    if(!user){
      return res.status(404).json({
        message : "No Such User Found",
        success : false
      })
    }

    const { status } = req.body;
    const applicationId = req.params.id;

    const application = await Application.findById(applicationId).populate({
      path: "job",
    });

    if (!application) {
      return res.status(400).json({
        message: "No Such Application found",
        success: false,
      });
    }

    const client = await User.findById(application?.job?.owner);
    if (!client) {
      return res.status(404).json({
        message: "No Client is found",
        success: false,
      });
    }

    const job = application.job;
    application.status = status;

    // Handle Rejected Applications
    if (application.status === "rejected") {
      for (const applicantObj of application?.applicant) {
        const applicantId = applicantObj.user;

        await User.findByIdAndUpdate(applicantId, {
          $addToSet: { rejectedJobs: application?.job?._id },
        });
      }

      await Application.findByIdAndDelete(applicationId);

      return res.status(200).json({
        message: "Application Rejected",
        success: true,
      });
    }

    // Handle Accepted Applications
    if (application.status === "accepted") {
      for (const applicantObj of application.applicant) {
        const applicantId = applicantObj.user;

        await User.findByIdAndUpdate(applicantId, {
          $addToSet: { activeJobs: job?._id },
        });

        await User.findByIdAndUpdate(client._id, {
          $addToSet: {
            connectedFreelancers: {
              freelancer: applicantId,
              connectedAt: new Date(),
            },
          },
        });

        // Set the freelancerAccepted field to the first applicant
        await Job.findByIdAndUpdate(application?.job?._id, {
          freelancerAccepted: applicantId,
        });
      }

      if (job) {
        job.status = "progress";
        await job.save();
      }

      const notification = await Notification.create({
        sendersDetails : userId,
        recieversDetail : job?.freelancerAccepted,
        category : "Job",
        message : `${user?.fullName} has accepted you job application for ${job?.title}`
      })
      const applicant = application?.applicant[0]?.user;
      const recieverSocketId = getRecieverSocketId(job?.freelancerAccepted);
      console.log("👤 Applicant:", applicant);
      console.log("📡 Receiver socket ID:", getRecieverSocketId(applicant.toString()));

      if (recieverSocketId) {
        
        io.to(recieverSocketId).emit("notification", notification);
        console.log("Client has accepted job application of the freelancer", notification);
      }

      await Notification.create({
        sendersDetail : client,
        recieversDetail : applicant,
        category : "Job",
        message : `${client?.fullName} accepted your job application`
      })
    }

    await application.save();

    return res.status(200).json({
      message: "Status Updated Successfully",
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

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User Does Not Exist",
        success: false,
      });
    }
    const applications = await Application.find({ "applicant.user": userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "owner", // populate the owner inside the job
        },
      });

    if (!applications) {
      return res.status(404).json({
        message: "No such Application",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All Applications Found",
      success: true,
      applications,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getAcceptedJobs = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) {
      return res.status(404).json({
        message: "No such user found",
        success: false,
      });
    }
    const applications = await Application.find({
      "applicant.user": userId,
      status: "accepted",
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "owner", // This assumes "owner" is a ref inside Job model
        },
      });

    if (!applications) {
      return res.status(404).json({
        message: "No such application found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Accepted Application AND jobs found",
      success: true,
      applications,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
