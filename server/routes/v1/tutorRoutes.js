import express from "express";
import {
  getAllTutors,
  getTutorProfileById,
  getMyTutorProfile,
  createTutorProfile,
  updateTutorProfile,
  approveTutorProfile,
  searchTutors,
} from "../../controllers/tutorController.js";
import { protect, restrictTo } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes - accessible to everyone
router.get("/", getAllTutors); // List all tutors with filtering
router.get("/search", searchTutors); // Search tutors
router.get("/profile/:id", getTutorProfileById); // Get tutor profile by ID

// Protected routes - only for authenticated tutors
router.post("/profile", protect, restrictTo("tutor"), createTutorProfile); // Create tutor profile
router.put("/profile", protect, restrictTo("tutor"), updateTutorProfile); // Update tutor profile
router.get("/me", protect, restrictTo("tutor"), getMyTutorProfile); // Get own profile

// Admin routes - only for authenticated admins
router.patch("/:id/approve", protect, restrictTo("admin"), approveTutorProfile);

export default router;
