import express from "express";
import { addLeave, getLeaves, updateLeaveStatus } from "../controllers/leaveController.js";

const router = express.Router();

router.get("/", getLeaves);
router.put("/:id", updateLeaveStatus);
router.post("/add", addLeave);

export default router;
