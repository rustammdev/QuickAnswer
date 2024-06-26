import User from "../model/register.model.js";
import bcrypt from "bcryptjs";

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
        .status(400)
        .json({ error: "You are not Registrated!" });
    }

    if (!(await bcrypt.compare(password, isAviable.password))) {
      return res.status(400).json({ error: "Incorrect password!" });
    }
    console.log("True");
    return res.status(200).json({
      success: true,
      message: "Login successful",
      redirectTo: "/dashboard",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res
      .status(500)
      .json({ error: "Serverda xatolik yuz berdi" });
  }
};

export default LoginController;
