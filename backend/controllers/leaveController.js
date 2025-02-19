import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getLeaves = async (req, res) => {
  try {
    const leaves = await prisma.leave.findMany({
      include: { employee: true },
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, leaves });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateLeaveStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; 
  try {
    const leave = await prisma.leave.update({
      where: { id: parseInt(id, 10) },
      data: { status },
    });
    res.json({ success: true, leave });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const addLeave = async (req, res) => {
  const { employeeId, startDate, endDate, reason } = req.body;
  
  try {
    const leave = await prisma.leave.create({
      data: {
        employeeId: parseInt(employeeId, 10),  // convert employeeId to a number
        startDate: new Date(startDate),         // convert string to Date
        endDate: new Date(endDate),             // convert string to Date
        reason,
        // status will default to PENDING automatically
      },
    });
    res.status(201).json({ success: true, leave });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
