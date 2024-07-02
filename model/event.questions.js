import mongoose, { mongo } from "mongoose";

const EventQuestionSchema = mongoose.Schema({
  event_id: {
    type: String,
    required: true,
  },
  created_by: {
    type: String,
    required: true,
  },
  genereted_questions: {
    type: Object,
    require: true,
  },
});

const model = mongoose.model("Event_Questions", EventQuestionSchema);

export default model;
