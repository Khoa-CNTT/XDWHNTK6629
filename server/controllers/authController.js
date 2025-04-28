import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import ApiError from "../utils/ApiError.js";
import "dotenv/config";

export const registerTutor = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) throw new ApiError(400, "Email already registered.");

    const user = await User.create({
      fullName,
      email,
      password,
      role: "tutor",
    });

    res.status(201).json({
      message: "Tutor registered successfully.",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const registerStudent = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) throw new ApiError(400, "Email already registered.");

    const user = await User.create({
      fullName,
      email,
      password,
      role: "student",
    });

    res.status(201).json({
      message: "Student registered successfully.",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw new ApiError(401, "Invalid email or password.");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new ApiError(401, "Invalid email or password.");

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "your-secret-key-here",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
