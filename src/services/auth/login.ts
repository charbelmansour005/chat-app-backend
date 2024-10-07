import { variables } from "../../helpers/variables.js";
import { User } from "../../models/User.js";
import { IUser } from "../../models/User.js";
import { createError } from "../../utils/errorFormatter.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

const { compare } = bcryptjs;
const { sign } = jsonwebtoken;

export const login = async (loginBody: IUser) => {
  const { email, password } = loginBody;

  const user = await User.findOne({ email: email });

  if (!user) {
    throw createError(
      401,
      "Not found",
      "A user with this email could not be found"
    );
  }

  const isEqual = await compare(password, user.password);

  if (!isEqual) {
    throw createError(401, "Invalid Credentials", "Wrong email or password");
  }

  await User.updateOne({ email: email });

  let loadedUser: unknown | any;
  loadedUser = user;

  const token = sign(
    {
      email: loadedUser.email,
      userId: loadedUser._id.toString(),
    },
    variables.SECRET,
    { expiresIn: "1h" }
  );

  return {
    token: token,
    userId: user._id,
  };
};
