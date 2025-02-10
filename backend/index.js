import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import attendanceRoutes from "./routes/attendance.js";
import salaryRoutes from "./routes/salary.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/salary", salaryRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
