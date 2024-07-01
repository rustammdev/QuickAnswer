import User from "../model/register.model.js";
import Event from "../model/create.event.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const dashboardController = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies || !cookies.token) {
    return res.status(401).redirect("/");
  }

  try {
    const data = jwt.verify(cookies.token, process.env.SECRET_KEY);

    const user = await User.findOne({ user_id: data.user_id });
    if (!user) {
      return res.status(404).redirect("/404");
    }

    let events = await Event.find({ created_by: data.user_id });
    console.log(events);
    events = events.map((event) => ({
      end_date: event.end_date,
      event_name: event.event_name,
      event_id: event._id.toString(),
      // Boshqa kerakli maydonlarni ham qo'shing
    }));
    console.log(events);

    events = events.reverse();
    res.render("dashboard", {
      title: "Dashboard | Qmarge",
      events: events,
    });
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid token" });
  }
};

export { dashboardController };
