import express from "express";
import authRouter from "./auth.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import departmentRouter from "./department.js";
import employeeRouter from "./employee.js";
import leaveRouter from "./leave.js";
import salaryRouter from "./salary.js";
import { getSummary } from "./summary.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/department", authMiddleware, departmentRouter);
router.use("/employee", authMiddleware, employeeRouter);
router.use("/leave", authMiddleware, leaveRouter);
router.use("/salary", authMiddleware, salaryRouter);
router.use("/summary",authMiddleware, getSummary);

export default router;
