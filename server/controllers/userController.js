import { User } from "../models/userModel.js";
import ApiError from "../utils/ApiError.js";

/**
 * Get current user profile
 * @route GET /api/users/me
 * @access Private
 */
export const getProfile = async (req, res, next) => {
  try {
    // req.user already has the user data from the authMiddleware (without password)
    if (!req.user) {
      return next(new ApiError(404, "User not found"));
    }

    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

/**
 * Update user profile
 * @route PUT /api/users/me
 * @access Private
 */
export const updateProfile = async (req, res, next) => {
  try {
    const { fullName, email } = req.body;

    // Basic validation
    if (!fullName || !email) {
      return next(new ApiError(400, "Full name and email are required"));
    }

    // Check if email already exists for another user
    if (email !== req.user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return next(new ApiError(400, "Email already in use"));
      }
    }

    // Update user document
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { fullName, email },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return next(new ApiError(404, "User not found"));
    }

    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

/**
 * Change user password
 * @route PUT /api/users/me/password
 * @access Private
 */
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Basic validation
    if (!currentPassword || !newPassword) {
      return next(
        new ApiError(400, "Current password and new password are required")
      );
    }

    // Password strength validation
    if (newPassword.length < 8) {
      return next(
        new ApiError(400, "Password must be at least 8 characters long")
      );
    }

    // Get user with password
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    // Check if current password is correct
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return next(new ApiError(401, "Current password is incorrect"));
    }

    // Update password
    user.password = newPassword;
    await user.save(); // This will trigger the pre-save hook to hash the password

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};
