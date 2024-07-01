import User from "../model/register.model.js";
import bcrypt from "bcryptjs";
import { generateJwtToken } from "../services/token.js";

const SendRegisterController = async (req, res) => {
  try {
    let { first_name, last_name, email, password } = req.body;
    if (!email || !password || !first_name || !last_name) {
      return res
        .status(400)
        .json({ error: "User ma'lumotlari to'liq emas!" });
    }

    // // User malumotlari db borlikka tekshirish
    const isAviable = await User.findOne({ email: email });
    if (isAviable) {
      return res.status(409).json({
        message: "Already registered with this email address.",
      });
    }

    // DB ga malumotlarni yozish
    const hashed = await bcrypt.hash(password, 10);
    const userCreate = await User.create({
      first_name,
      last_name,
      email,
      password: hashed,
    });

    // Token genereted
    const token = generateJwtToken({ user_id: userCreate.user_id });

    // Token save cooking
    return res.status(201).cookie("token", token).json({
      success: true,
      message: "",
      redirectTo: "/dashboard",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred on the server." });
  }
};

export default SendRegisterController;
