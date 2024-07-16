import { Schema, model } from "mongoose";

const QuestionScheme = new Schema(
    {
        event_id: { type: Schema.Types.ObjectId, ref: "Events" },

        created_by: {
            type: String,
            required: false,
            default: "unknown",
        },

        data: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const Model = model("Questions", QuestionScheme);
export default Model;
