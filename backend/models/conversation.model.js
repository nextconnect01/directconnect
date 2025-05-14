import mongoose,{Schema} from "mongoose";

const conversationSchema = new Schema(
    {
        messages : [{
            type : Schema.Types.ObjectId,
            ref : "Message"
        }],
        participants : [{
            type : Schema.Types.ObjectId,
            ref : "User"
        }]
    },
    {timestamps:true}
)

export const Conversation = mongoose.model("Conversation",conversationSchema)