import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Mark Attendance
export const markAttendance = async (req, res) => {
    const { userId, status } = req.body;

    try {
        await prisma.attendance.create({
            data: { userId, status },
        });
        res.status(201).json({ message: "Attendance marked successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error marking attendance" });
    }
};

// Get Attendance
export const getAttendance = async (req, res) => {
    try {
        const attendance = await prisma.attendance.findMany();
        res.json(attendance);
    } catch (error) {
        res.status(400).json({ message: "Error fetching attendance" });
    }
};
