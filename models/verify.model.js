import { model, Schema } from 'mongoose'

const VerifySchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
)

export default model('EmailVerify', VerifySchema)
