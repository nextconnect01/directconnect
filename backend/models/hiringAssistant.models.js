import mongoose,{Schema} from "mongoose"

const hiringSchema = new Schema(
    {
        userDetails : {
            type : Schema.Types.ObjectId,
            ref : "User"
        },
        
        yourSpecialization : {
            type : String,
            required : true
        },
        yearsOfExperience : {
            type : String ,
            required : true
        },
        skills : [
            {type : String},
        ],
        reason : {
            type : String,
            required : true
        },
        status : {
            type : String,
            enum : ["Accepted","Rejected","Pending"],
            default : "Pending"
        }
    },{timestamps:true}
)

export const HiringAssistant = mongoose.model("HiringAssistant",hiringSchema)