import { Schema, model } from 'mongoose'

const QuestionScheme = new Schema(
    {
        event_id: { type: Schema.Types.ObjectId, ref: 'Events' },
        user_id: { type: Schema.Types.ObjectId, ref: 'Users' },
        username: {
            type: String,
            required: false,
            default: 'unknown',
        },

        message: {
            type: String,
            required: true,
        },

        extralink: {
            type: String,
            default: null,
        },

        likeCount: {
            type: Number,
            default: 0,
        },
        unlikeCount: {
            type: Number,
            default: 0,
        },

        likedUsers: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
        unLikedUsers: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    },
    { timestamps: true },
)

const Model = model('Questions', QuestionScheme)
export default Model
