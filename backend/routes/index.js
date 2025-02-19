import express from "express";
import authRouter from "./auth.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import departmentRouter from "./department.js";
import employeeRouter from "./employee.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/department", authMiddleware, departmentRouter);
router.use("/employee", authMiddleware, employeeRouter);

export default router;
