import { RequestHandler } from "express";
import { statusCodes } from "../helpers/statusCodes";
import { Chatroom } from "../models/Chatroom";

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

export { addChatroomController };
