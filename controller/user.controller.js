import userServices from "../services/user.services.js";

class UserController {
  async home(req, res) {
    res.status(200).json({ message: "This is the home page" });
  }

  // register
  async register(req, res) {
    const {email, password} = req.body;
    const  user = await userServices.registeration(email, password)

    res.status(user.statusCode).json({path : "register", ...user});
  }
}

export default new UserController();
