import { model, Schema } from 'mongoose'

const UserSchema = new Schema(
    {
        firstname: {
            type: String,
            trim: true,
            required: true,
        },
        bio: {
            type: String,
            default: 'No bio',
        },
        specialization: {
            type: String,
            trim: true,
        },
        username: {
            type: String,
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },

        moderators: [{ type: Schema.Types.ObjectId, ref: 'Events' }],
    },
    { timestamps: true },
)

export default model('User', UserSchema)
