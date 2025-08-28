import "dotenv/config";
import jwt from "jsonwebtoken";

export const generateToken = ({
  identifier,
  expiresIn = 60 * 60 * 24,
  secret,
}) => {
  try {
    const token = jwt.sign({ identifier }, process.env[secret], { expiresIn });
    return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};

export const tokenVerificationErrors = {
  "invalid signature": "Invalid signature",
  "jwt expired": "JWT expired",
  "invalid token": "Invalid",
  "No Bearer": "No bearer token",
  "jwt malformed": "wrong JWT",
};
