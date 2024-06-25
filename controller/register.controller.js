import User from "../model/register.model.js";
import bcrypt from "bcryptjs";

const SendQuestionController = async (req, res) => {
  try {
    let { first_name, last_name, email, password } = req.body;
    if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({
        // Don't complated content: 999
        situation: "999",
        message: "Kiritilgan malumotlar to'iq emas",
      });
      throw new Error("User malumotlari toliq emas!");
    }

    // // User malumotlari db borlikka tekshirish
    const isAviable = await User.findOne({ email });
    if (isAviable) {
      return res.status(400).json({
        // IsAviable true: 222
        situation: "222",
        message: "Kiritilgan malumotlar to'iq emas",
      });
      throw new Error("User malumotlari allaqachon mavjud!");
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

    res.status(201).json({ situation: "777", message: "ok" });
  } catch (error) {
    res.json({ error: `${error}` });
  }
};

export default SendQuestionController;
