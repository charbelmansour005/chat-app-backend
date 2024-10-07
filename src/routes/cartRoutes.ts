import { Router } from "express";
import { addToCart } from "../controllers/cartController";
import { isAuth } from "../middleware/isAuth";

const router = Router();

router.post("/cart", isAuth, addToCart);

export default router;
