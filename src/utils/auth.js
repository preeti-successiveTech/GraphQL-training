import jwt from "jsonwebtoken";
import { SERVER_CONFIG } from "../config/serverConfig.js";
import { User } from "../models/user.js";
export const generateToken = (user) => {
  const token = jwt.sign(
    { id: user._id, email: user.email },
    SERVER_CONFIG.key,
    { expiresIn: "1h" }
  );
  return token;
};

export const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, SERVER_CONFIG.key);
    const user = await User.findById(decoded.id);
    return user;
  } catch (err) {
    return null;
  }
};
