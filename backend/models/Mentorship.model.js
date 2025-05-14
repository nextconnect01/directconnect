import mongoose,{Schema} from "mongoose"

const mentorshipSchema = new Schema(
    {
        userId : {
            type : Schema.Types.ObjectId,
            ref : "User" 
        },
        fullName : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true
        },
        currentProfession : {
            type : String,
            required : true
        },
        experience : {
            type : String,
            required : true
        },
        areaOfExpertise : [
            {
                type : String
            }
        ],
        professionalBio : {
            type : String,
            required : true
        },
        linkedin : {
            type : String,
            required : true
        },
        availability : {
            type : String,
            required : true
        },
        mentoringType : [
            {type : String}
        ],
        reason : {
            type : String,
            required : true
        },
        freeSession : {
            type : Boolean
        },
        status : {
            type : String,
            enum : ["Accepted","Rejected","Pending"],
            default : "Pending"
        }
    },{timestamps : true}
)

export const Mentorship = mongoose.model("Mentorship",mentorshipSchema)
