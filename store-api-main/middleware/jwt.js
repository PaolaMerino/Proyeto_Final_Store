import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../utils/tokenManager.js";

export const requireToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;

    if (!token) throw new Error("No Bearer");

    token = token.split(" ")[1];
    const { identifier } = jwt.verify(token, process.env.JWT_SECRET);

    req.uid = identifier;

    next();
  } catch (error) {
    console.log(error.message);
    return res
      .status(401)
      .send({ error: tokenVerificationErrors[error.message] });
  }
};

export const requireRefreshToken = (req, res, next) => {
  try {
    const refreshTokenCookie = req.body.refreshToken;
    if (!refreshTokenCookie) throw new Error("Token does not exists");

    const { identifier } = jwt.verify(
      refreshTokenCookie,
      process.env.JWT_REFRESH
    );

    req.uid = identifier;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: tokenVerificationErrors[error.message] });
  }
};
