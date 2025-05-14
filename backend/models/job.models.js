import mongoose,{Schema} from "mongoose"

const jobSchema = new Schema(
    {
        title : {
            type : String,
            required : true,

        },
        description : {
            type : String,
            required : true,
        },
        salary : {
            type : Number,
            required : true
        },
        skills : [{
            type : String,
            default : []
        }],
        rank : {
            type : String
        },
        owner : {
            type : Schema.Types.ObjectId,
            ref : "User",
        },
        freelancerAccepted : {
            type : Schema.Types.ObjectId,
            ref : "User"
        },
        duration : {
            type : String,
            required : true
        },
        status : {
            type : String,
            enum : ["progress","completed","active","paused","disputes","specific"],
            default : "active"
        },
        application : [{
            type : Schema.Types.ObjectId,
            ref : "Application"
        }],
        jobType : {
            type : String,
            enum : ["oneTime","ongoing","contract"],
            default : "oneTime"
        },
        applicationDeadline : {
            type : Date,
        },
        budgetType : {
            type : String,
            enum : ["fixed","hourly"],
            default : "fixed"
        },
        category : {
            type : String,
            
        },
        experienceLevel : {
            type : String
        },
        delivarables : {
            type : String
        }
    },
    {timestamps:true}
)

export const Job = mongoose.model("Job",jobSchema)