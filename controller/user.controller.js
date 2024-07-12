import userServices from "../services/user.services.js";
import {validationResult} from "express-validator";


class UserController {
  async home(req, res) {
    res.status(200).json({ message: "This is the home page" });
  }

  // register
  async register(req, res) {
    try {
      const {email, password} = req.body;
      const  errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
      }

      const  user = await userServices.registeration(email, password);
      res.status(user.statusCode).cookie('accesToken', user.accesToken, {httpOnly : true, maxAge : 30 * 24 * 60 * 60 * 1000}).json({...user});
    }catch (e) {
      return res.status(400).json({ errors: e });
    }
  }

  async login(req, res) {
    try {
      const {email, password} = req.body;
      const  errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
      }

      const  user = await  userServices.login(email, password);
      console.log(user)
      res.status(user.statusCode).cookie('accesToken', user.accesToken, {httpOnly : true, maxAge : 30 * 24 * 60 * 60 * 1000}).json({...user});
    }catch (e) {
      return res.status(400).json({ errors: e });
    }
  }
}

export default new UserController();
