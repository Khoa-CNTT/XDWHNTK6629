import express from "express";
import {
  registerTutor,
  registerStudent,
  login,
} from "../../controllers/authController.js";
import { validateAuth } from "../../validations/authValidation.js";

const router = express.Router();

router.post("/register/tutor", validateAuth, registerTutor);
router.post("/register/student", validateAuth, registerStudent);
router.post("/login", login);

export default router;
