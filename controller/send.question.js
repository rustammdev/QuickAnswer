import SendQuestion from "../model/send.question.js";

const SendQuestionController = async (req, res) => {
  try {
    const { event_id, question_text } = req.body;

    if (!event_id || !asked_by || !question_text) {
      return res
        .status(400)
        .json({
          situation: "999",
          message: "Kiritilgan malumotlar to'iq emas",
        });
    }

    // event mavjudlikka tekshirish
    const event = await Event.findOne({ event_id: event_id });
    if (!event) {
      return res
      .status(404)
      .json({
        situation: "222",
        message: "Event topilmadi",
      });
    }

    const question = await Question.create(req.body);
    res.status(201).json({ message: "ok" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default SendQuestionController;
