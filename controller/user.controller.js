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
      console.log(user)
      res.cookie('accesToken', user.accessToken);
      res.cookie('refreshToken', user.refreshToken, {httpOnly : true, maxAge : 30 * 24 * 60 * 60 * 1000});
      res.status(user.statusCode).json({message : user.message, accessToken: user.accessToken});
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

      res.cookie('accesToken', user.accessToken);
      res.cookie('refreshToken', user.refreshToken, {httpOnly : true, maxAge : 30 * 24 * 60 * 60 * 1000});
      res.status(user.statusCode).json({message : user.message, accessToken: user.accessToken});
    }catch (e) {
      return res.status(400).json({ errors: e });
    }
  }

  async logout(req, res) {
    try{
      const refreshToken = req.cookies.refreshToken;
      if(!refreshToken){
        return res.status(404).json({message : 'Token not found'});
      }
      const  user = await  userServices.logout(refreshToken);

      res.clearCookie('accesToken')
      res.clearCookie('refreshToken')
      res.status(user.statusCode).json({ message: user.message});
    }catch (e){
      console.log(e)
      return res.status(400).json({message : "Some error", errors: e });
    }
  }
}

export default new UserController();
