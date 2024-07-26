import userServices from "../services/user.services.js";
import {validationResult} from "express-validator";


class UserController {
  async home(req, res) {
    res.status(200).json({status: 'ok', code : 200, message: "This is the home page"});
  }

  // register
  async register(req, res) {
    try {
      const {fullname, password, username} = req.body;
      const  errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({code : 400, message: errors.array()});
      }

      let  user = await userServices.registeration(fullname, password, username);

      res.cookie('accessToken', user.accessToken, {httpOnly : true});
      res.cookie('refreshToken', user.refreshToken, {httpOnly : true, maxAge : 30 * 24 * 60 * 60 * 1000});

      const {refreshToken, ...newUser} = user;
      res.status(user.code).json(newUser);
    }catch (e) {
      return res.status(400).json({code : 400, message: e.message});
    }
  }

  async login(req, res) {
    try {
      const {username, password} = req.body;
      const  errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({code : 400, message: errors.array()});
      }

      const  user = await  userServices.login(username, password);

      res.cookie('accessToken', user.accessToken, {httpOnly : true, secure : true});
      res.cookie('refreshToken', user.refreshToken, {httpOnly : true, maxAge : 30 * 24 * 60 * 60 * 1000, secure : true});

      const {refreshToken, ...newUser} = user;
      res.status(user.code).json({...newUser});
    }catch (e) {
      return res.status(400).json({code : 400, message : e.message});
    }
  }

  async logout(req, res) {
    try{
      const refreshToken = req.cookies.refreshToken;
      if(!refreshToken){
        return res.status(404).json({code : 404, message : 'Token not found'});
      }
      const  user = await  userServices.logout(refreshToken);

      res.clearCookie('accessToken')
      res.clearCookie('refreshToken')
      res.status(user.code).json(user);
    }catch (e){
      console.log(e)
      return res.status(400).json({code : 400, message : e.message });
    }
  }
}

export default new UserController();
