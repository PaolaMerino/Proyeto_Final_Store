import { Router } from "express";
import {
  addToCart,
  findById,
  login,
  refreshToken,
  signUp,
} from "../controllers/user.controller.js";
import { requireRefreshToken, requireToken } from "../middleware/jwt.js";

const router = Router();

router.post("/token", login);

router.post("/refresh-token", requireRefreshToken, refreshToken);

export default router;
