import jwt from "jsonwebtoken";
import TokenModel from "../model/token.model.js";

class TokenServices{
    tokengenerate(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCES_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {expiresIn: '30d'});
        return {accessToken, refreshToken};
    }

    async saveToken(userId, refreshToken){
        const  tokenData = await TokenModel.findOne({user : userId})

        if(tokenData){
            tokenData.refreshToken = refreshToken
            tokenData.save()
        }

        const  token = await  TokenModel.create({user : userId, refreshToken})
        return {message : "Token saved successfully."};
    }
}


export  default  new TokenServices()