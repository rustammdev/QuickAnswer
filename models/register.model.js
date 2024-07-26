import {model, Schema} from "mongoose";

const UserSchema = new Schema({
    fullname : {
        type: String,
        trim: true,
        required: true,
    },
    bio : {
        type: String,
        default : "No bio",
    },
    username : {
        type: String,
        required: true,
        unique: true,
    },
    email : {
        type: String,
        unique: true,
        sparse: true,
    },
    password : {
        type: String,
        required: true,
    },

    moderators : [{ type: Schema.Types.ObjectId, ref: 'Events' }],
}, { timestamps: true })


export default  model("User", UserSchema)