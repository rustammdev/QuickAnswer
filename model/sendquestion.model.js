import mongoose from "mongoose";

const SendQuestion = mongoose.Schema(
  {
    question_text: {
      type: String,
      require: [true, "Question text kiritilmagan"],
    },
    event_id: {
      type: String,
      require: [true, "Event id kiritilmagan"],
    },
    asked_by: {
      type: String,
      require: false,
      default : "Not available"
    },
  },
  { timestamps: true }
);

const model = mongoose.model("questions", SendQuestion);

export default model;
