import UserModel from "../models/register.model.js";
import  bcrypt from "bcryptjs";
import tokenServices from "./token.services.js";

class UserServices {
    async registeration(email, password) {
        try {
            const  condidate = await UserModel.findOne({email: email})

            if(condidate){
                return ({status : 'no', code : 409, message: "User already exist"});
            }
            const  hash = await bcrypt.hash(password, 12);
            const  user = await UserModel.create({email, password : hash})

            const  tokens =  tokenServices.tokengenerate({email : user.email, id: user._id})
            await  tokenServices.saveToken(user._id, tokens.refreshToken);

            return {refreshToken : tokens.refreshToken, status: 'ok', code : 201, message: "User created successfully.", accessToken : tokens.accessToken,};
        }catch (e){
            console.log(e.message)
            return  {code : 403, message : 'Failed to create user'};
        }
    }

    async login(email, password) {
        try{
            const  user = await  UserModel.findOne({email})
            if(!user){
                return ({code : 404, message: "User not found"});
            }

            const  isPassEquel = await bcrypt.compare(password, user.password)
            if(!isPassEquel){
                return ({code : 400, message: "Invalid Password"});
            }

            const  tokens = tokenServices.tokengenerate({email : user.email, id: user._id})
            await  tokenServices.saveToken(user._id, tokens.refreshToken)

            return {status: 'ok', code : 200, message: "User login.", ...tokens};
        }catch (e){
            console.log(e)
            return ({code : 400, message: "Some error"});
        }
    }

    async logout(refreshToken) {
        try{
            const  data = await  tokenServices.deleteToken(refreshToken)
            return {status: 'ok', code : 200, ...data};
        }catch (e){
            return ({code : 400, message: "Some error"});
        }
    }
}

export default new UserServices;