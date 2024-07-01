import jwt from "jsonwebtoken";
import "dotenv/config";

const generateJwtToken = (userId) => {
  const accesToken = jwt.sign(userId, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });

  return accesToken;
};

export { generateJwtToken };
