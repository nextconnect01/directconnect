import mongoose,{Schema} from "mongoose"

const updatedUsersSchema = new Schema(
    {
        email : {
            type : String,
            required : true
        },
        fullName : {
            type : String,
            required : true
        },
        role : {
            type : String,
            required : true
        }
    },{timestamps:true}
)

export const UpdatedUser = mongoose.model("UpdatedUser",updatedUsersSchema)