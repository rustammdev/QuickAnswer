import UserModel from "../model/register.model.js";
import  bcrypt from "bcryptjs";
import tokenServices from "./token.services.js";
import TokenModel from "../model/token.model.js";

class UserServices {
    async registeration(email, password) {
        try {
            const  condidate = await UserModel.findOne({email: email})

            if(condidate){
                return ({statusCode : 409, message: "User already exist"});
            }
            const  hash = await bcrypt.hash(password, 12);
            const  user = await UserModel.create({email, password : hash})

            const  tokens = await tokenServices.tokengenerate({email : user.email, id: user._id})
            await  tokenServices.saveToken(user._id, tokens.refreshToken)

            return {statusCode : 201, message: "User created successfully.", ...tokens};
        }catch (e){
            console.log(e)
            return  {statusCode : 403, message : 'Failed to create user'};
        }
    }

    async login(email, password) {
        try{
            const  user = await  UserModel.findOne({email})
            if(!user){
                return ({statusCode : 404, message: "User not found"});
            }

            const  isPassEquel = await bcrypt.compare(password, user.password)
            if(!isPassEquel){
                return ({statusCode : 400, message: "Invalid Password"});
            }

            const  tokens = await tokenServices.tokengenerate({email : user.email, id: user._id})
            await  tokenServices.saveToken(user._id, tokens.refreshToken)

            return {statusCode : 200, message: "User login.", ...tokens};
        }catch (e){
            console.log(e)
        }
    }
}

export default new UserServices;