import { Router } from "express";
// import { isAuth } from "../middleware/isAuth";
import {
  addChatroomController,
  getAllChatrooms,
  getChatroomMessages,
} from "../controllers/chatroomController";

const router = Router();

// Apply isAuth middleware to all routes
// router.use(isAuth);

// Group related routes
router.route("/chatroom").post(addChatroomController).get(getAllChatrooms);

router.get("/chatroom/:id", getChatroomMessages);

export default router;
