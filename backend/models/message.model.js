import mongoose,{Schema} from "mongoose";

const messageSchema = new Schema(
    {
        sendersId : {
            type : Schema.Types.ObjectId,
            ref : "User",
            required : true
        },
        recieversId : {
            type : Schema.Types.ObjectId,
            ref : "User",
            required : true
        },
        message : {
            type : String,
            required : true
        },
        fileUrl : {
            type : String
        },
        fileType : {
            type : String,
            enum : ["text","image","pdf","zip"]
        },
        projectBrief : [{
            type : Schema.Types.ObjectId,
            ref : "Job",

        },]
    },
    {timestamps : true}
)

export const Message = mongoose.model("Message",messageSchema)