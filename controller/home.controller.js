import User from "../model/register.model.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const homeGetController = async (req, res) => {
  try {
    const cookies = req.cookies;

    // Agar ro'yxatdan o'tmagan bo'lsa
    if (cookies && cookies.token) {
    try {
      const data = jwt.verify(cookies.token, process.env.SECRET_KEY);
      const user = await User.findOne({ user_id: data.user_id });
      if (user) {
        return res.status(302).redirect("/dashboard");
      }
      // return res.status(200).redirect("/404");
    } catch (error) {
      return res.status(200).render("home", {
        title: "Home | Qmarge",
      });
    }
    }
    return res.status(200).render("home", {
      title: "Home | Qmarge",
    });
  } catch (error) {
    console.log(error);
  }
};

export default homeGetController;
