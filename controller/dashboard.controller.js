import User from "../model/register.model.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const dashboardController = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies || !cookies.token) {
    // .send("Unauthorized: JWT must be provided")
    return res.status(401).redirect("/");
  }

  try {
    const data = jwt.verify(cookies.token, process.env.SECRET_KEY);

    const user = await User.findOne({ user_id: data.user_id });
    if (!user) {
      return res.status(404).redirect("/404");
    }

    return res.status(200).render("dashboard", {
      title : "Dashboard | Qmarge"
    });
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid token" });
  }
};

export { dashboardController };
