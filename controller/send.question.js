const SendQuestionController = (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: "ok" });
};

export default SendQuestionController;
