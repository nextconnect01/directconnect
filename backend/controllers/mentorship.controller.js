import { Mentorship } from "../models/Mentorship.model.js";
import { User } from "../models/user.model.js";

export const applyAsMentor = async(req,res) => {
    try {
        const userId = req.id
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({
                message : "No Such User Found",
                success : false
            })
        }

        const {fullName,email,currentProfession,experience,areaOfExpertise,professionalBio,linkedin,availability,mentoringType,reason,freeSession} = req.body
        if(!fullName || !email || !currentProfession || !experience || !areaOfExpertise || !professionalBio || !linkedin || !availability || !mentoringType || !reason || !freeSession ){
            return res.status(400).json({
                message : "Something is missins Please Fill All The Fields Properly",
                success : false
            })
        }

        const mentorship  = await Mentorship.create({
            userId,
            fullName,
            email,
            currentProfession,
            experience,
            areaOfExpertise,
            professionalBio,
            linkedin,
            availability,
            mentoringType,
            reason,
            freeSession,
        })

        if(!mentorship){
            return res.status(400).json({
                message : "Form Cannot be submitted due to some issue",
                success : false
            })
        }

        return res.status(201).json({
            message : "Successfully Applied For Mentorship",
            success : true,
            mentorship
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Internal Server Error",
            success : true
        })
        
    }
}

export const getMentorship = async (req,res) => {
    try {
        const userId = req.id
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({
                message : "No Such User Found",
                success : false
            })
        }

        const mentorships = await Mentorship.find({userId : userId})
        if (!mentorships || mentorships.length === 0) {
            return res.status(400).json({
              message: "Not Applied For Mentoring",
              success: false
            });
          } else {
            return res.status(200).json({
              message: "Applied For Mentoring",
              success: true
            });
          }
          

        

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Internal Server Error",
            success : false
        })
        
    }
}
