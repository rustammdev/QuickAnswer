import Events from "../model/create.event.js";

const DeleteEventController = async (req, res) => {
  try {
    const event = await Events.deleteOne({ _id: req.body.id });
    res.status(200).json({ message: "Event deleted" });
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
};

export { DeleteEventController };
