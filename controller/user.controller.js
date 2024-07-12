import userServices from "../services/user.services.js";
import {validationResult} from "express-validator";


class UserController {
  async home(req, res) {
    res.status(200).json({ message: "This is the home page" });
  }

  // register
  async register(req, res) {
    const {email, password} = req.body;
    const  errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }

    const  user = await userServices.registeration(email, password)

    res.status(user.statusCode).json({...user});
  }
}

export default new UserController();
