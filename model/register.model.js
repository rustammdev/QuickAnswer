import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchem = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "Please add the first name"],
      unique: true,
    },
    last_name: {
      type: String,
      required: [true, "Please add the last name"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please add the email address"],
    },
    password: {
      type: String,
      required: [true, "Please add the password"],
    },
    user_id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("users", userSchem);

export default model;
