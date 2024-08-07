import { Schema, model } from "mongoose";

const eventScheme = new Schema(
    {
        created_by: { type: Schema.Types.ObjectId, ref: "User" },

        event_name: {
            type: String,
            required: true,
        },

        event_desc: {
            type: String,
            required: false,
            default: "Send question >>>",
        },

        end_date: {
            type: String,
            required: true,
        },

        filter_data : {
            type: Array,
        },

        moderators : [{ type: Schema.Types.ObjectId, ref: 'Users' }]

    },
    { timestamps: true }
);

const Model = model("Events", eventScheme);
export default Model;
