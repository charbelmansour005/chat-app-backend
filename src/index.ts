import * as dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import { connectMongoDB } from "./db/mongoose.db";
import paymentRoutes from "./routes/paymentRoutes";
import authRoutes from "./routes/authRoutes";
import cartRoutes from "./routes/cartRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import chatroomRoutes from "./routes/chatroomRoutes";
import { Socket } from "socket.io";
import cors from "cors";
import { Chatroom } from "./models/Chatroom";
import { Message } from "./models/Message";
import { User } from "./models/User";

export interface IErrorResponse extends Error {
  status: number;
  data?: any;
}

const app = express();
app.use(cors());

const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", paymentRoutes);
app.use("/api", cartRoutes);
app.use("/api", categoryRoutes);
app.use("/api", chatroomRoutes);

app.use("*", (req: Request, res: Response) => {
  return res.status(404).json({ message: "Could not find Endpoint!" });
});

app.use(
  (error: IErrorResponse, req: Request, res: Response, next: NextFunction) => {
    const { message, status, data } = error;
    res.status(status || 404).json({
      message: message || "Internal server issues",
      data: data,
    });
  }
);

// Listen for Socket.io connections
io.on("connection", (socket: Socket) => {
  // console.log("A user connected:", socket.id);

  // join chatroom
  socket.on("joinRoom", async ({ roomId, userId }) => {
    try {
      const chatroom = await Chatroom.findById(roomId);

      if (!chatroom) {
        return socket.emit("error", {
          type: "room_not_found",
          message: "Chatroom not found",
        });
      }

      if (chatroom.users.includes(userId)) {
        return socket.emit("error", {
          type: "user_exists",
          message: "User already in the chatroom",
        });
      }

      chatroom.users.push(userId);
      await chatroom.save();

      socket.join(roomId);
      console.log(`user ${userId} joined room ${roomId}`);

      // Optionally, notify the room about the new user
      socket.to(roomId).emit("userJoined", { userId });
    } catch (error) {
      console.log({ error_joinRoom: error });
    }
  });

  //leave chatroom
  socket.on("leaveRoom", async ({ roomId, userId }) => {
    try {
      const chatroom = await Chatroom.findById(roomId);

      if (!chatroom) {
        return socket.emit("error", {
          type: "room_not_found",
          message: "Chatroom not found",
        });
      }

      if (!chatroom.users.includes(userId)) {
        return socket.emit("error", {
          type: "user_doesnt_exist",
          message: "User not in the chatroom",
        });
      }

      chatroom.users = chatroom.users.filter(
        (user) => user.toString() !== userId
      );
      await chatroom.save();
      socket.leave(roomId);
    } catch (error) {
      console.log({ error_leaveRoom: error });
    }
  });

  // Send message in chatroom
  socket.on("chatMessage", async (data) => {
    try {
      const { roomId, senderId, content } = data;

      if (!roomId || !senderId || !content) {
        return socket.emit("error", {
          type: "could_not_send_message",
          message: "Error sending message",
        });
      }

      const chatroom = await Chatroom.findById(roomId);
      const sender = await User.findById(senderId);

      if (!chatroom || !sender) {
        return socket.emit("error", {
          type: "could_not_send_message",
          message: "Error sending message",
        });
      }

      const message = new Message({
        content,
        sender: senderId,
        chatroom: roomId,
      });
      await message.save();

      // Save message to chatroom
      chatroom.messages.push(message._id);
      await chatroom.save();

      // Emit message to all users in the room
      io.to(roomId).emit("message", { content, senderId });
    } catch (error) {
      console.log({ error_chatMessage: error });

      socket.emit("error", {
        type: "could_not_send_message",
        message: "Error sending message",
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

connectMongoDB(http);
