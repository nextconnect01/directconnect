import { HiringAssistant } from "../models/hiringAssistant.models.js";
import { User } from "../models/user.model.js";

export const applyAsHiringAssistant = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "No Such User Found",
        success: false,
      });
    }

     const alreadyApplied = await HiringAssistant.findOne({ userDetails: userId });
    if (alreadyApplied) {
      return res.status(400).json({
        message: "You have already applied as a Hiring Assistant",
        success: false,
      });
    }
    const { yourSpecialization, yearsOfExperience, skills, reason } = req.body;
    if (!yourSpecialization || !yearsOfExperience || !skills || !reason) {
      return res.status(400).json({
        message: "Something is Missing",
        success: false,
      });
    }

    const hiringAssistant = await HiringAssistant.create({
      userDetails: userId,
      yourSpecialization,
      yearsOfExperience,
      skills,
      reason,
    });

    if (!hiringAssistant) {
      return res.status(401).json({
        message: "Application Cannot be submitted",
        success: false,
      });
    }

    await hiringAssistant.populate({ path: "userDetails" });

    const existingUser = await User.findByIdAndUpdate(
      userId,
      { hiringAssistantStatus: "Pending" },
      { new: true }
    );

    return res.status(201).json({
      message: "Application Submitted",
      success: true,
      existingUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getAllHiringAssistant = async (req,res) => {
  try {
    const userId = req.id
    const user = await User.findById(userId)
    if(!user){
      return res.status(404).json({
        message : "No Such User Found",
        success : false
      })
    }

    const hiringAssistants = await HiringAssistant.find({status : "Accepted"}).populate({path : "userDetails"})
    if(hiringAssistants.length === 0 || !hiringAssistants){
      return res.status(400).json({
        message : "No Hiring Assistant exist as of now",
        success : false
      })
    }

    return res.status(200).json({
      message : "Hiring Assistant Found",
      success : true,
      hiringAssistants
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message : "Internal Server Error",
      success : false
    })
    
  }
}

export const changeStatus = async(req,res) => {
  try {
    const userId = req.id
    const assistantId = req.params.id
    const {status}  = req.body
    const user = await User.findById(userId)
    if(!user){
      return res.status(404).json({
        message : "No Such User found",
        success : false
      })
    }
    const hiringAssistant = await HiringAssistant.findOne({userDetails : assistantId})
    if(!hiringAssistant){
      return res.status(400).json({
        message : "Hiring Assistant not Found",
        success : false
      })
    }

    if(!status){
      return res.status(400).json({
        message : "Status Cannot be Empty",
        success : false
      })
    }

    if(user.role !== "admin"){
      return res.status(401).json({
        message : "You Dont have Permission to change this ",
        success : false
      })
    }

    hiringAssistant.status = status
    await hiringAssistant.save()
    await User.findByIdAndUpdate(assistantId,{hiringAssistantStatus : status})

    return res.status(200).json({
      message : "Status Changed SuccessFully",
      success : true
    })


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message : "Internal Server Error",
      success : false
    })
    
  }
}