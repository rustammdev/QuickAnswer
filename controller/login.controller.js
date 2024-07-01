import User from "../model/register.model.js";
import bcrypt from "bcryptjs";
import { generateJwtToken } from "../services/token.js";

const LoginController = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "User ma'lumotlari to'liq emas!" });
    }

    // User malumotlari db borlikka tekshirish
    const isAviable = await User.findOne({ email });
    if (!isAviable) {
      return res
        .status(409)
        .json({ message: "You are not Registered!" });
    }

    if (!(await bcrypt.compare(password, isAviable.password))) {
      return res.status(400).json({ message: "Incorrect password!" });
    }

    // Token genereted
    const token = generateJwtToken({ user_id: isAviable.user_id });

    return res.status(200).cookie("token", token).json({
      success: true,
      message: "",
      redirectTo: "/dashboard",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res
      .status(500)
      .json({ message: "Serverda xatolik yuz berdi" });
  }
};

export default LoginController;
