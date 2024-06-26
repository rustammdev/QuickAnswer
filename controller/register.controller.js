import User from "../model/register.model.js";
import bcrypt from "bcryptjs";

const SendRegisterController = async (req, res) => {
  try {
    let { first_name, last_name, email, password } = req.body;
    if (!email || !password || !first_name || !last_name) {
      return res
        .status(400)
        .json({ error: "User ma'lumotlari to'liq emas!" });
    }

    // // User malumotlari db borlikka tekshirish
    const isAviable = await User.findOne({ email });
    if (isAviable) {
      return res
        .status(400)
        .json({ error: "User ma'lumotlari allaqachon mavjud!" });
    }

    // DB ga malumotlarni yozish
    const hashed = await bcrypt.hash(password, 10);
    console.log({
      first_name,
      last_name,
      email,
      password: hashed,
    });
    const user = await User.create({
      first_name,
      last_name,
      email,
      password: hashed,
    });
    console.log("User registered");
    res.status(201).send('ok');
  } catch (error) {
    console.error("Registration error:", error);
    return res
      .status(500)
      .json({ error: "Serverda xatolik yuz berdi" });
  }
};

export default SendRegisterController;
