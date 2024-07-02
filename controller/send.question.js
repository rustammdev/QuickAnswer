import SendQuestion from "../model/send.question.js";
import Event from "../model/create.event.js";

const SendQuestionController = async (req, res) => {
  try {
    console.log(req.body);
    // event mavjudlikka tekshirish
    const event = await Event.findOne({
      event_id: req.body.event_id,
    });
    if (!event) {
      return res.status(404).json({
        message: "Event topilmadi",
      });
    }
    console.log(event);
    const question = await SendQuestion.create(req.body);
    res.status(201).json({ message: "ok" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default SendQuestionController;
