class UserController {
  async home(req, res) {
    res.status(200).json({ message: "This is home route" });
  }


  async register(req, res) {
    res.status(200).json({ message: "This is register route" });
  }
}

export default new UserController();
