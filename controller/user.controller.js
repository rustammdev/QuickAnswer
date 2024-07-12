import userServices from "../services/User.services.js";

class UserController {
  async home(req, res) {
    res.status(200).json({ message: "This is the home page" });
  }


  async register(req, res) {
    const {email, password} = req.body;
    const  user = await userServices.createUser(email, password)

    res.status(200).json({path : "register", ...user });
  }
}

export default new UserController();
