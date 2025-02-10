import express from "express";
import { markAttendance, getAttendance } from "../controllers/attendanceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/mark", protect, markAttendance);
router.get("/", protect, getAttendance);

export default router;
