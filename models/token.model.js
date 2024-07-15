import  {model, Schema} from "mongoose"

const TokenSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    refreshToken: { type: String, required: true },
}, { timestamps: true });

const  Token = model("Token", TokenSchema);
export default Token;