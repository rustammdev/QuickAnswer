import userServices from "../services/user.services.js";
import {validationResult} from "express-validator";


class UserController {
  async home(req, res) {
    res.status(200).json({status: 'ok', code : 200, message: "This is the home page"});
  }
  // register
  async register(req, res) {
    try {
      const {email, password} = req.body;
      const  errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({status: 'no', code : 400, errors: errors.array()});
      }

      const  user = await userServices.registeration(email, password);

      res.cookie('accessToken', user.accessToken, {httpOnly : true});
      res.cookie('refreshToken', user.refreshToken, {httpOnly : true, maxAge : 30 * 24 * 60 * 60 * 1000});
      res.status(user.code).json({status: user.status, code : user.code, message : user.message, accessToken: user.accessToken});
    }catch (e) {
      return res.status(400).json({status: 'no', code : 400, errors: e});
    }
  }

  async login(req, res) {
    try {
      const {email, password} = req.body;
      const  errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({status: 'no', code : 400, errors: errors.array()});
      }

      const  user = await  userServices.login(email, password);

      res.cookie('accessToken', user.accessToken, {httpOnly : true, secure : true});
      res.cookie('refreshToken', user.refreshToken, {httpOnly : true, maxAge : 30 * 24 * 60 * 60 * 1000, secure : true});
      res.status(user.code).json({status: user.status, code : user.code, message : user.message, accessToken: user.accessToken});
    }catch (e) {
      return res.status(400).json({status: 'no', code : 400, errors: e});
    }
  }

  async logout(req, res) {
    try{
      const refreshToken = req.cookies.refreshToken;
      if(!refreshToken){
        return res.status(404).json({status : 'no', code : 404, message : 'Token not found'});
      }
      const  user = await  userServices.logout(refreshToken);

      res.clearCookie('accessToken')
      res.clearCookie('refreshToken')
      res.status(user.code).json({status: user.status, code : user.code, message: user.message});
    }catch (e){
      console.log(e)
      return res.status(400).json({status: "no", code : 400, message : "Some error", errors: e });
    }
  }
}

export default new UserController();
