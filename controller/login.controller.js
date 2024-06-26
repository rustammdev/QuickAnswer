import User from "../model/register.model.js";
import bcrypt from "bcryptjs";

const SendLoginController = async (req, res) => {
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

    if(!await bcrypt.compare(password, isAviable.password)){
        console.log(false);
    }
    console.log(true);
    res.status(201).send('ok');
  } catch (error) {
    console.error("Registration error:", error);
    return res
      .status(500)
      .json({ error: "Serverda xatolik yuz berdi" });
  }
};

export default SendLoginController;
