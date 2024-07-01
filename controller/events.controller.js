import jwt from "jsonwebtoken";
import Event from "../model/create.event.js";
import "dotenv/config";

const CreateEvent = async (req, res) => {
  try {
    let { event_name, event_desc, event_link, end_date } = req.body;
    const cookies = req.cookies;
    const data = jwt.verify(cookies.token, process.env.SECRET_KEY);

    const eventData = {
      event_name,
      event_desc,
      event_link,
      end_date,
      created_by: data.user_id,
    };

    const event = await Event.create(eventData);

    return res.status(200).json({
      message: "Event created",
    });
  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }
};

export { CreateEvent };
