import express from "express";
import authRouter from "./auth.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import departmentRouter from "./department.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/department", authMiddleware, departmentRouter);

export default router;
