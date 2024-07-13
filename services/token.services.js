import jwt from "jsonwebtoken";
import TokenModel from "../model/token.model.js";
import tokenModel from "../model/token.model.js";

class TokenServices{
    tokengenerate(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCES_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {expiresIn: '30d'});
        return {accessToken, refreshToken};
    }

    async saveToken(userId, refreshToken){
        const  tokenData = await TokenModel.findOne({user : userId})

        if(tokenData){
            // refresh token mavjud bo'lsa yangi refesh tokenga o'zgartirish
            tokenData.refreshToken = refreshToken
            await tokenData.save();
            return { message: "Token updated successfully." };
        }

        await  TokenModel.create({user : userId, refreshToken});
        return {message : "Token saved successfully."};
    }

    async deleteToken(refreshToken){
       try{
           const  {id} = jwt.decode(refreshToken, process.env.REFRESH_SECRET_KEY);
           await tokenModel.deleteOne({user : id})
           return {message : "Token deleted successfully."};
       }catch (e){
           console.log(e)
           return  {message : "Failed to delete token."};
       }
    }
}


export  default  new TokenServices()