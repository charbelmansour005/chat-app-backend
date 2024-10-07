import { Router } from "express";
import { postLogin, putRegister } from "../controllers/authController";
import { registerValidations } from "../validations/authValidations";

const router = Router();

router.put("/register", registerValidations, putRegister);
router.post("/login", postLogin);

export default router;
