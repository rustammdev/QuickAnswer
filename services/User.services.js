import UserModel from "../model/register.model.js";
import  bcrypt from "bcryptjs";

class UserServices {
    async createUser(email, password) {
        try {
            const  condidate = await UserModel.findOne({email: email})

            if(condidate){
                return ({message: "User already exists"});
            }
            const  hash = await bcrypt.hash(password, 12);
            const  user = await UserModel.create({email, password : hash})

            return {message: "User created successfully.", user: user};
        }catch (e){
            console.log(e)
            return  e;
        }
    }
}


export default new UserServices;