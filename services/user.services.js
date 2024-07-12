import UserModel from "../model/register.model.js";
import  bcrypt from "bcryptjs";
import tokenServices from "./token.services.js";

class UserServices {
    async registeration(email, password) {
        try {
            const  condidate = await UserModel.findOne({email: email})

            if(condidate){
                return ({statusCode : 409, message: "User already exist"});
            }
            const  hash = await bcrypt.hash(password, 12);
            const  user = await UserModel.create({email, password : hash})

            const  tokens = await  tokenServices.tokengenerate({email : user.email, id: user._id})
            await  tokenServices.saveToken(user._id, tokens.refreshToken)

            return {statusCode : 201, message: "User created successfully.", ...tokens};
        }catch (e){
            console.log(e)
            return  {statusCode : 403, error : 'Failed to create user'};
        }
    }
}

export default new UserServices;