import mongoose, { Schema, Types } from "mongoose";

interface IChatroom extends Document {
  name: string;
  users?: string[];
  messages?: Types.ObjectId[];
}

const ChatroomSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    users: [
      {
        type: Schema.Types.ObjectId,
        refPath: "User",
        required: false,
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        refPath: "Message",
        required: false,
      },
    ],
  },
  { timestamps: true }
);

const Chatroom = mongoose.model<IChatroom>("Chatroom", ChatroomSchema);

export { Chatroom, IChatroom };
