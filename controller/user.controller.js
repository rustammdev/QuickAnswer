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
        return res.status(400).json({ errors: errors.array(), ok : false});
      }

      const  user = await userServices.registeration(email, password);

      res.cookie('accessToken', user.accessToken, {httpOnly : true});
      res.cookie('refreshToken', user.refreshToken, {httpOnly : true, maxAge : 30 * 24 * 60 * 60 * 1000});
      res.status(user.statusCode).json({message : user.message, accessToken: user.accessToken, ok : true});
    }catch (e) {
      return res.status(400).json({ errors: e , ok : false});
    }
  }

  async login(req, res) {
    try {
      const {email, password} = req.body;
      const  errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array(), ok : false});
      }

      const  user = await  userServices.login(email, password);

      res.cookie('accessToken', user.accessToken, {httpOnly : true, secure : true});
      res.cookie('refreshToken', user.refreshToken, {httpOnly : true, maxAge : 30 * 24 * 60 * 60 * 1000, secure : true});
      res.status(user.statusCode).json({message : user.message, accessToken: user.accessToken, ok : true});
    }catch (e) {
      return res.status(400).json({ errors: e, ok : false });
    }
  }

  async logout(req, res) {
    try{
      const refreshToken = req.cookies.refreshToken;
      if(!refreshToken){
        return res.status(404).json({message : 'Token not found', ok : false});
      }
      const  user = await  userServices.logout(refreshToken);

      res.clearCookie('accessToken')
      res.clearCookie('refreshToken')
      res.status(user.statusCode).json({ message: user.message, ok : true});
    }catch (e){
      console.log(e)
      return res.status(400).json({message : "Some error", errors: e , ok : false});
    }
  }
}

export default new UserController();
