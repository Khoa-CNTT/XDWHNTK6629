import { TutorProfile } from "../models/tutorProfileModel.js";
import { User } from "../models/userModel.js";
import ApiError from "../utils/ApiError.js";

/**
 * @desc    Create a new tutor profile
 * @route   POST /api/v1/tutors/profile
 * @access  Private (Tutors only)
 */
export const createTutorProfile = async (req, res, next) => {
  try {
    // Check if user is a tutor
    if (req.user.role !== "tutor") {
      return next(new ApiError(403, "Only tutors can create tutor profiles"));
    }

    // Check if profile already exists
    const existingProfile = await TutorProfile.findOne({ user: req.user._id });
    if (existingProfile) {
      return next(
        new ApiError(400, "Tutor profile already exists. Use update instead.")
      );
    }

    const { fullName, email, subjects, availability, price, profilePicture } =
      req.body;

    // Basic validation
    if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
      return next(new ApiError(400, "Please provide at least one subject"));
    }

    if (
      !availability ||
      !Array.isArray(availability) ||
      availability.length === 0
    ) {
      return next(new ApiError(400, "Please provide availability details"));
    }

    if (!price || isNaN(Number(price)) || Number(price) < 0) {
      return next(new ApiError(400, "Please provide a valid price"));
    }

    // Create a new profile with mapped fields
    const formattedSubjects = subjects.map((subject) => ({
      name: subject,
      level: "all-levels",
    }));

    const formattedAvailability = availability
      .map((slot) => {
        // Handle different availability formats
        if (typeof slot === "string") {
          // If it's a simple string like "monday"
          return { day: slot.toLowerCase() };
        } else if (typeof slot === "object") {
          // If it's an object with day/time information
          return slot;
        }
        return null;
      })
      .filter((slot) => slot !== null);

    // Create new tutor profile
    const tutorProfile = await TutorProfile.create({
      user: req.user._id,
      hourlyRate: price,
      subjects: formattedSubjects,
      availability: formattedAvailability,
      profilePicture,
      status: "active",
    });

    // Update user's name and email if provided
    if (fullName || email) {
      await User.findByIdAndUpdate(
        req.user._id,
        {
          ...(fullName && { fullName }),
          ...(email && { email }),
        },
        { runValidators: true }
      );
    }

    // Return created profile
    const populatedProfile = await TutorProfile.findById(
      tutorProfile._id
    ).populate("user", "fullName email");

    res.status(201).json({
      success: true,
      data: populatedProfile,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update tutor profile
 * @route   PUT /api/v1/tutors/profile
 * @access  Private (Tutors only)
 */
export const updateTutorProfile = async (req, res, next) => {
  try {
    // Check if user is a tutor
    if (req.user.role !== "tutor") {
      return next(new ApiError(403, "Only tutors can update tutor profiles"));
    }

    const { fullName, email, subjects, availability, price, profilePicture } =
      req.body;

    // Find tutor profile
    let tutorProfile = await TutorProfile.findOne({ user: req.user._id });
    if (!tutorProfile) {
      return next(new ApiError(404, "Tutor profile not found"));
    }

    // Prepare update data
    const updateData = {};

    // Format subjects if provided
    if (subjects && Array.isArray(subjects) && subjects.length > 0) {
      updateData.subjects = subjects.map((subject) => ({
        name: subject,
        level: "all-levels",
      }));
    }

    // Format availability if provided
    if (
      availability &&
      Array.isArray(availability) &&
      availability.length > 0
    ) {
      updateData.availability = availability
        .map((slot) => {
          // Handle different availability formats
          if (typeof slot === "string") {
            return { day: slot.toLowerCase() };
          } else if (typeof slot === "object") {
            return slot;
          }
          return null;
        })
        .filter((slot) => slot !== null);
    }

    // Add price/hourlyRate if provided
    if (price !== undefined) {
      if (isNaN(Number(price)) || Number(price) < 0) {
        return next(new ApiError(400, "Please provide a valid price"));
      }
      updateData.hourlyRate = Number(price);
    }

    // Add profile picture if provided
    if (profilePicture) {
      updateData.profilePicture = profilePicture;
    }

    // Update tutor profile
    tutorProfile = await TutorProfile.findOneAndUpdate(
      { user: req.user._id },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    // Update user's name and email if provided
    if (fullName || email) {
      const userUpdateData = {};
      if (fullName) userUpdateData.fullName = fullName;
      if (email) {
        // Validate email if provided
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return next(new ApiError(400, "Please provide a valid email"));
        }
        userUpdateData.email = email;
      }

      await User.findByIdAndUpdate(req.user._id, userUpdateData, {
        runValidators: true,
      });
    }

    // Return updated profile with user info
    const populatedProfile = await TutorProfile.findOne({
      user: req.user._id,
    }).populate("user", "fullName email");

    res.status(200).json({
      success: true,
      data: populatedProfile,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get tutor profile by ID
 * @route   GET /api/v1/tutors/profile/:id
 * @access  Public
 */
export const getTutorProfileById = async (req, res, next) => {
  try {
    const tutorProfile = await TutorProfile.findById(req.params.id).populate(
      "user",
      "fullName email"
    );

    if (!tutorProfile) {
      return next(new ApiError(404, "Tutor profile not found"));
    }

    res.status(200).json({
      success: true,
      data: tutorProfile,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    List all tutors with filtering
 * @route   GET /api/v1/tutors
 * @access  Public
 */
export const getAllTutors = async (req, res, next) => {
  try {
    // Build filter object based on query parameters
    const filter = { status: "active" }; // Only show active tutors

    // Subject filtering
    if (req.query.subject) {
      filter["subjects.name"] = { $regex: req.query.subject, $options: "i" };
    }

    // Price range filtering based on priceRange parameter
    if (req.query.priceRange) {
      filter.hourlyRate = {};

      switch (req.query.priceRange) {
        case "low":
          filter.hourlyRate.$lte = 25;
          break;
        case "medium":
          filter.hourlyRate.$gt = 25;
          filter.hourlyRate.$lte = 50;
          break;
        case "high":
          filter.hourlyRate.$gt = 50;
          break;
      }
    }

    // Availability filtering
    if (req.query.availability) {
      filter["availability.day"] = {
        $regex: req.query.availability,
        $options: "i",
      };
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Find tutors with the specified filters
    const tutors = await TutorProfile.find(filter)
      .populate("user", "fullName email")
      .sort({ "rating.average": -1 })
      .skip(skip)
      .limit(limit);

    // Count total number of matching tutors (for pagination)
    const totalTutors = await TutorProfile.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: tutors.length,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalTutors / limit),
        totalResults: totalTutors,
      },
      data: tutors,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Search tutors by name, subject, or price
 * @route   GET /api/v1/tutors/search
 * @access  Public
 */
export const searchTutors = async (req, res, next) => {
  try {
    // Build search filter
    const filter = { status: "active" };

    // Search by name
    if (req.query.name) {
      // We need to search on the user collection for name
      const users = await User.find({
        fullName: { $regex: req.query.name, $options: "i" },
        role: "tutor",
      }).select("_id");

      const tutorIds = users.map((user) => user._id);
      filter.user = { $in: tutorIds };
    }

    // Search by subject
    if (req.query.subject) {
      filter["subjects.name"] = { $regex: req.query.subject, $options: "i" };
    }

    // Filter by price range
    if (req.query.price) {
      filter.hourlyRate = {};

      switch (req.query.price) {
        case "low":
          filter.hourlyRate.$lte = 25;
          break;
        case "medium":
          filter.hourlyRate.$gt = 25;
          filter.hourlyRate.$lte = 50;
          break;
        case "high":
          filter.hourlyRate.$gt = 50;
          break;
      }
    }

    // Execute search query
    const tutors = await TutorProfile.find(filter)
      .populate("user", "fullName email")
      .sort({ "rating.average": -1 });

    res.status(200).json({
      success: true,
      count: tutors.length,
      data: tutors,
    });
  } catch (error) {
    next(error);
  }
};

// Additional utility controllers - keeping them for compatibility

/**
 * @desc    Get current tutor's own profile
 * @route   GET /api/v1/tutors/me
 * @access  Private (Tutors only)
 */
export const getMyTutorProfile = async (req, res, next) => {
  try {
    const tutorProfile = await TutorProfile.findOne({
      user: req.user._id,
    }).populate("user", "fullName email");

    if (!tutorProfile) {
      return res.status(200).json({
        success: true,
        data: null,
        message: "Tutor profile not found. Please create one.",
      });
    }

    res.status(200).json({
      success: true,
      data: tutorProfile,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Admin: Approve tutor profile
 * @route   PATCH /api/v1/tutors/approve/:id
 * @access  Private (Admin only)
 */
export const approveTutorProfile = async (req, res, next) => {
  try {
    // Ensure only admins can approve profiles
    if (req.user.role !== "admin") {
      throw new ApiError(403, "Only admins can approve tutor profiles");
    }

    const tutorProfile = await TutorProfile.findById(req.params.id);

    if (!tutorProfile) {
      throw new ApiError(404, "Tutor profile not found");
    }

    tutorProfile.status = "active";
    await tutorProfile.save();

    res.status(200).json({
      success: true,
      message: "Tutor profile approved",
      data: tutorProfile,
    });
  } catch (error) {
    next(error);
  }
};
