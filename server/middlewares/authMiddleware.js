import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import ApiError from "../utils/ApiError.js";

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next(new ApiError(401, "No token provided"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    next(new ApiError(401, "Invalid token"));
  }
};

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, "Access denied"));
    }
    next();
  };
};
