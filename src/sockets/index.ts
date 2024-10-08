import { Server } from "socket.io";
import { handleChatSocket } from "./chatSocket";

export const initializeSocket = (httpServer: any) => {
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    handleChatSocket(socket);

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return io;
};
