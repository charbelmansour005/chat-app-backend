import { Router } from "express";
import { isAuth } from "../middleware/isAuth";
import { addChatroomController } from "../controllers/chatroomController";

const router = Router();

router.post("/chatroom", isAuth, addChatroomController);

export default router;
