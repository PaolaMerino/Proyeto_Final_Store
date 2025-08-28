import { Router } from "express";
import { login, refreshToken, signUp } from "../controllers/user.controller.js";
import {
  create,
  findAll,
  findById,
  remove,
  update,
} from "../controllers/product.controller.js";
import { requireToken } from "../middleware/jwt.js";

const router = Router();

router.post("/", requireToken, create);

router.get("/", findAll);

router.get("/:id", findById);

router.patch("/:id", requireToken, update);

router.delete("/:id", requireToken, remove);

export default router;
