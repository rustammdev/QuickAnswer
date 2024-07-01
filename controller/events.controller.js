import jwt from "jsonwebtoken";
import "dotenv/config";

const CreateEvent = (req, res) => {
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
    console.log(eventData);
  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }
  res.status(200).json({ message: "ok" });
};

export { CreateEvent };
