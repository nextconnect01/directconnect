import mongoose,{Schema} from "mongoose"

const notificationSchema = new Schema(
    {
        sendersDetail : {
            type : Schema.Types.ObjectId,
            ref : "User"
        },
        recieversDetail : {
            type : Schema.Types.ObjectId,
            ref : "User"
        },
        category : {
            type : String,
            enum : ["Message","Job","Payments","Proposals","System","Rating"]
        },
        isRead : {
            type : Boolean,
            default : false
        },
        message : {
            type : String
        }
    },{timestamps:true}
)

export const Notification = mongoose.model("Notification",notificationSchema)