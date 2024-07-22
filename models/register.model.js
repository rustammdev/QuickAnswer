import {model, Schema} from "mongoose";

const UserSchema = new Schema({
    username : {
        type: String,
        required: true,
        unique: true,
    },
    email : {
        type: String,
        unique: true,
        required: true,
    },
    password : {
        type: String,
        required: true,
    }
}, { timestamps: true })


export default  model("User", UserSchema)