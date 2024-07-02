import Questions from "../model/send.question.js";
import Event from "../model/create.event.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const dashboardController = async (req, res) => {
  try {
    const data = jwt.verify(
      req.cookies.token,
      process.env.SECRET_KEY
    );

    let events = await Event.find({ created_by: data.user_id });
    events = events.map((event) => ({
      end_date: event.end_date,
      event_name: event.event_name,
      event_id: event._id.toString(),
      // Boshqa kerakli maydonlarni ham qo'shing
    }));

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

// :id
const dashboardIdController = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    console.log(event);
    // const question = await Questions.findById({event_id : event.event_id});

    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export { dashboardController, dashboardIdController };
