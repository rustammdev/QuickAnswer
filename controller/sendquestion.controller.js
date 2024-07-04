import SendQuestion from "../model/sendquestion.model.js";
import Event from "../model/create.event.js";

const SendQuestionController = async (req, res) => {
  try {
    // event mavjudlikka tekshirish
    const event = await Event.findById(req.body.event_id);
    if (!event) {
      return res.status(404).json({
        message: "Event not found!",
      });
    }
    const question = await SendQuestion.create(req.body);
    res.status(201).json({ message: "Question sended!" });
  } catch (error) {
    res.status(404).json({
      message: "Event not found!",
    });
  }
};

export default SendQuestionController;
