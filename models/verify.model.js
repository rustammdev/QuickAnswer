import { model, Schema } from 'mongoose'

const VerifySchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        code: {
            type: Number,
            required: true,
        },
        expiresAt: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true },
)

export default model('EmailVerify', VerifySchema)
