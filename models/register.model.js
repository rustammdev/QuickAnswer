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
        sparse: true,
    },
    password : {
        type: String,
        required: true,
    },

    moderators : [{ type: Schema.Types.ObjectId, ref: 'Events' }],
    events: [{ type: Schema.Types.ObjectId, ref: 'Event' }]
}, { timestamps: true })


export default  model("User", UserSchema)