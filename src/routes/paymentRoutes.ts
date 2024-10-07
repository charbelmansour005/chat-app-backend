import { Router } from "express";
import { postMockPayment } from "../controllers/paymentController";
import { isAuth } from "../middleware/isAuth";

const router = Router();

router.post("/payment", isAuth, postMockPayment);

export default router;
