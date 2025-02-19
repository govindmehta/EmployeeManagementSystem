import express from "express";
import { getSalaries, addSalary, updateSalary, getSalaryById } from "../controllers/salaryController.js";

const router = express.Router();

// Get all salary records
router.get("/", getSalaries);

// Optionally, add a salary record
router.post("/add", addSalary);

// Update salary record by ID
router.put("/:id", updateSalary);
router.get("/:id", getSalaryById);

export default router;
