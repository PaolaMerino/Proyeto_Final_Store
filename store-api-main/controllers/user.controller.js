import { ERROR_MESSAGES } from "../config/constants.js";
import {
  addToCartService,
  clearCartService,
  findAllService,
  findByIdService,
  login as loginService,
  refreshToken as refreshTokenService,
  removeFromCartService,
  signUpService,
} from "../services/user.service.js";

export const login = async (req, res) => {
  try {
    const auth = await loginService(req.body);

    return res.status(200).json(auth);
  } catch (error) {
    switch (error.message) {
      case ERROR_MESSAGES.USER_NOT_FOUND:
        return res.status(404).json({ error: ERROR_MESSAGES.USER_NOT_FOUND });

      case ERROR_MESSAGES.USER_BLOCKED:
        return res.status(403).json({ error: ERROR_MESSAGES.USER_BLOCKED });

      case ERROR_MESSAGES.INVALID_CREDENTIALS:
        return res
          .status(401)
          .json({ error: ERROR_MESSAGES.INVALID_CREDENTIALS });

      default:
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const signUp = async (req, res) => {
  try {
    const auth = await signUpService(req.body);

    return res.status(200).json(auth);
  } catch (error) {
    switch (error.message) {
      case ERROR_MESSAGES.USER_ALREADY_EXISTS:
        return res
          .status(403)
          .json({ error: ERROR_MESSAGES.USER_ALREADY_EXISTS });

      default:
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refrehAuth = await refreshTokenService(req.body);

    return res.status(200).json(refrehAuth);
  } catch (error) {
    switch (error.message) {
      case ERROR_MESSAGES.USER_NOT_FOUND:
        return res.status(404).json({ error: ERROR_MESSAGES.USER_NOT_FOUND });

      case ERROR_MESSAGES.INVALID_TOKEN:
        return res.status(403).json({ error: ERROR_MESSAGES.INVALID_TOKEN });

      default:
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const findAll = async (req, res) => {
  try {
    const users = await findAllService();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const findMe = async (req, res) => {
  try {
    const userId = req.uid;

    const user = await findByIdService(userId);

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const userId = req.uid;

    const { productId, quantity } = req.body;

    const updatedUser = await addToCartService(userId, productId, quantity);

    return res.status(200).json(updatedUser);
  } catch (error) {
    switch (error.message) {
      case ERROR_MESSAGES.USER_NOT_FOUND:
        return res.status(404).json({ error: ERROR_MESSAGES.USER_NOT_FOUND });

      case ERROR_MESSAGES.PRODUCT_NOT_FOUND:
        return res
          .status(404)
          .json({ error: ERROR_MESSAGES.PRODUCT_NOT_FOUND });

      default:
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.uid;

    const { productId } = req.body;

    const updatedUser = await removeFromCartService(userId, productId);

    return res.status(200).json(updatedUser);
  } catch (error) {
    switch (error.message) {
      case ERROR_MESSAGES.USER_NOT_FOUND:
        return res.status(404).json({ error: ERROR_MESSAGES.USER_NOT_FOUND });

      case ERROR_MESSAGES.PRODUCT_NOT_FOUND:
        return res
          .status(404)
          .json({ error: ERROR_MESSAGES.PRODUCT_NOT_FOUND });

      default:
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.uid;

    const updatedUser = await clearCartService(userId);

    return res.status(200).json(updatedUser);
  } catch (error) {
    switch (error.message) {
      case ERROR_MESSAGES.USER_NOT_FOUND:
        return res.status(404).json({ error: ERROR_MESSAGES.USER_NOT_FOUND });

      case ERROR_MESSAGES.PRODUCT_NOT_FOUND:
        return res
          .status(404)
          .json({ error: ERROR_MESSAGES.PRODUCT_NOT_FOUND });

      default:
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
