import express from "express";
import {
  getProfile,
  updateProfile,
  changePassword,
} from "../../controllers/userController.js";
import { protect } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(protect);

// User profile routes
router.get("/me", getProfile);
router.put("/me", updateProfile);
router.put("/me/password", changePassword);

export default router;
