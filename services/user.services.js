import UserModel from "../models/register.model.js";
import  bcrypt from "bcryptjs";
import tokenServices from "./token.services.js";

class UserServices {
    async registeration(password, username) {
        try {
            const  condidate = await UserModel.findOne({username})

            if(condidate){
                return ({status : 'fail', code : 409, message: "User already exist"});
            }
            const  hash = await bcrypt.hash(password, 12);
            const  user = await UserModel.create({username, password : hash})

            const  tokens =  tokenServices.tokengenerate({username, id: user._id})
            await  tokenServices.saveToken(user._id, tokens.refreshToken);

            return { refreshToken : tokens.refreshToken, status: 'success', code : 201, message: "User created successfully.", accessToken : tokens.accessToken };
        }catch (e){
            return  {status : "error", code : 500, message : 'Failed to create user', error: e.message};
        }
    }

    async login(username, password) {
        try{
            const  user = await  UserModel.findOne({username})
            if(!user){
                return ({status : "no", code : 404, message: "User not found"});
            }

            const  isPassEquel = await bcrypt.compare(password, user.password)
            if(!isPassEquel){
                return ({status : "no", code : 400, message: "Invalid Password"});
            }

            const  tokens = tokenServices.tokengenerate({username : user.username, id: user._id})
            await  tokenServices.saveToken(user._id, tokens.refreshToken)

            return {status: 'ok', code : 200, message: "User login.", ...tokens};
        }catch (e){
            return ({status : "no", code : 400, message: "Some error", error : e.message});
        }
    }

    async logout(refreshToken) {
        try{
            const  data = await  tokenServices.deleteToken(refreshToken)
            return {status: 'ok', code : 200, ...data};
        }catch (e){
            return ({status : "no", code : 400, message: "Some error", error: e.message});
        }
    }
}

export default new UserServices;