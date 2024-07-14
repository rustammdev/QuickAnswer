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

    async validateRefresh(refreshToken){
        try {
            const  isTrue = await jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
            const  data = await  tokenModel.findOne({refreshToken : refreshToken});

            if(data == null){
                return  null;
            }
            return isTrue;
        }catch (e){
            return  null;
        }
    }

    async validateAccess(accessToken){
        try {
            const isTrue = await jwt.verify(accessToken, process.env.JWT_ACCES_SECRET);
            return isTrue;
        } catch (e) {
            return null;
        }
    }
}


export  default  new TokenServices()