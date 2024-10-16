import { RequestHandler } from "express";
import { statusCodes } from "../helpers/statusCodes";
import { Chatroom, IChatroom } from "../models/Chatroom";
import { Message } from "../models/Message";

const addChatroomController: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const result = new Chatroom({
      name: data?.name,
    });
    await result.save();
    return res.status(statusCodes.createSuccess).json(result);
  } catch (error) {
    next(error);
  }
};

const getAllChatrooms: RequestHandler = async (_, res, next) => {
  try {
    const chatrooms: any = await Chatroom.find();

    const response = chatrooms?.map((item: any) => ({
      _id: item._id,
      name: item.name,
      users: item.users,
      createdAt: item?.createdAt,
    }));

    return res.status(statusCodes.readSuccess).json(response);
  } catch (error) {
    next(error);
  }
};

const getChatroomMessages: RequestHandler = async ({ params }, res, next) => {
  try {
    const { id } = params;

    const chatroom: any = await Chatroom.findById(id);

    const messages: any = await Message.find({
      _id: { $in: chatroom?.messages },
    });

    return res.status(statusCodes.readSuccess).json(messages);
  } catch (error) {
    next(error);
  }
};

export { addChatroomController, getAllChatrooms, getChatroomMessages };

// // Loop through each chatroom
// for (const chatroom of chatrooms) {
//   // Loop through each message in the chatroom
//   for (const messageId of chatroom.messages) {
//     const messageItem: IMessage | null = await Message.findById(messageId);
// if (messageItem) {
//   messageText.push(messageItem.content);
// }
//   }
// }
