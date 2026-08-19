import express from "express";
import { signup, login, googleLogin } from "../controllers/AuthController";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/google", googleLogin);

export default router;

