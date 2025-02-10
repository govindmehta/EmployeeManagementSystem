import express from "express";
import { updateSalary, getSalary } from "../controllers/salaryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/update", protect, updateSalary);
router.get("/:userId", protect, getSalary);

export default router;
