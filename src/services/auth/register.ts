import { IUser } from "../../models/User.js";
import { createError } from "../../utils/errorFormatter.js";
import { User } from "../../models/User.js";
import { transporter } from "../../helpers/transporter.js";
import bcryptjs from "bcryptjs";

const { hash } = bcryptjs;

export const register = async (registerBody: IUser) => {
  const { email, password, firstName, lastName } = registerBody;
  const user = await User.findOne({ email: email });

  if (user) {
    throw createError(
      409,
      "Already exists",
      "A user with this email already exists"
    );
  }

  const hashedPassword = await hash(password, 12);

  const authenticatedUser = new User({
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: hashedPassword,
  });

  transporter.sendMail({
    to: email,
    from: "employees@node-complete.com",
    html: "<h1>Welcome! Thank you for choosing us.</h1>",
  });

  const result = await authenticatedUser.save();
  const registeredEmail = result.email;

  return {
    message: "Sign up success",
    email: registeredEmail,
  };
};
