import { set, connect } from "mongoose";
import { variables } from "../helpers/variables";

export const connectMongoDB = async (app: any) => {
  try {
    app.listen(3000);
    set("strictQuery", false);
    await connect(variables.MONGO_URI);
    console.log(`MongoDB Connected! - Version: ${variables.VERSION}`);
    console.log("listening on: ", 3000);
  } catch (error) {
    console.log(error);
  }
};
//
