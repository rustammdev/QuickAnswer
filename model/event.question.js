import mongoose, { mongo } from 'mongoose';

const EventQuestionSchema = mongoose.Schema({
  event_id: {
    type: String,
    required: true,
  },
  created_by: {
    type: String,
    required: true,
  },
  question_text: {
    type: Array,
    required: true,
  },
});

const model = mongoose.model('Event_Questions', EventQuestionSchema);

export default model;
