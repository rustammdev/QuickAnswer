import { Schema, model } from "mongoose";

const QuestionScheme = new Schema(
    {
        event_id: { type: Schema.Types.ObjectId, ref: "Events" },

        sended : {
            type: String,
            required: false,
            default: "unknown",
        },

        message: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const Model = model("Questions", QuestionScheme);
export default Model;
