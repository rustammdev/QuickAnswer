const SendQuestionController = (req, res) => {
  try {
    // const { question_text, event_id } = req.body;
    // if (!question_text  || !event_id) {
    //   return res.status(200).json({ message: "no" });
    // }
    console.log(req.body);
    res.status(200).json({ message: "ok" });
  } catch (error) {
    res.json({ error: `${error}` });
  }
};

export default SendQuestionController;
