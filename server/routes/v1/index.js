import express from "express";
import authRoutes from "./authRoutes.js";
import tutorRoutes from "./tutorRoutes.js";
import userRoutes from "./userRoutes.js";
// import other v1 routes later

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/tutors", tutorRoutes);
router.use("/users", userRoutes);

export default router;
