import { Router } from "express";
import { isAuth } from "../middleware/isAuth";
import {
  addChatroomController,
  getAllChatrooms,
} from "../controllers/chatroomController";

const router = Router();

router.post("/chatroom", isAuth, addChatroomController);
router.get("/chatroom", isAuth, getAllChatrooms);

export default router;
