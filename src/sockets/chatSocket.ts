import { Socket } from "socket.io";
import { Chatroom } from "../models/Chatroom";
import { Message } from "../models/Message";
import { User } from "../models/User";

export const handleChatSocket = (socket: Socket) => {
  // Join chatroom
  socket.on("joinRoom", async ({ roomId, userId }) => {
    try {
      const chatroom = await Chatroom.findById(roomId);

      if (!chatroom) {
        return socket.emit("error", {
          type: "room_not_found",
          message: "Chatroom not found",
        });
      }

      if (!chatroom.users.includes(userId)) {
        chatroom.users.push(userId);
        await chatroom.save();
      }

      socket.join(roomId);
      console.log(`User ${userId} joined room ${roomId}`);

      // Notify the room about the new user
      socket.to(roomId).emit("userJoined", { userId });
    } catch (error) {
      console.log({ error_joinRoom: error });
    }
  });

  // Leave chatroom
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
      socket.to(roomId).emit("message", { content, senderId });
    } catch (error) {
      console.log({ error_chatMessage: error });

      socket.emit("error", {
        type: "could_not_send_message",
        message: "Error sending message",
      });
    }
  });
};
