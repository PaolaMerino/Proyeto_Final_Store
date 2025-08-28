import { Router } from "express";
import {
  addToCart,
  clearCart,
  findAll,
  findMe,
  login,
  refreshToken,
  removeFromCart,
  signUp,
} from "../controllers/user.controller.js";
import { requireRefreshToken, requireToken } from "../middleware/jwt.js";

const router = Router();

router.get("/", findAll);

router.get("/me", requireToken, findMe);

router.post("/login", login);

router.post("/sign-up", signUp);

router.patch("/add-to-cart", requireToken, addToCart);

router.patch("/remove-from-cart", requireToken, removeFromCart);

router.patch("/clear-cart", requireToken, clearCart);

router.post("/refresh-token", requireRefreshToken, refreshToken);

export default router;
