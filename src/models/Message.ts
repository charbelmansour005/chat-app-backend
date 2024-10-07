import mongoose, { Schema } from "mongoose";

interface IMessage extends Document {
  content: string;
  sender: string;
  chatroom?: string;
  receiver?: string;
}

const MessageSchema: Schema = new Schema(
  {
    content: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, refPath: "User", required: true },
    chatroom: {
      type: Schema.Types.ObjectId,
      refPath: "Chatroom",
      required: false,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      refPath: "User",
      required: false,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model<IMessage>("Message", MessageSchema);

export { Message, IMessage };
