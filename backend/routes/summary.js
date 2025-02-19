import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getSummary = async (req, res) => {
  try {
    const totalEmployees = await prisma.employee.count();
    const totalDepartments = await prisma.department.count();

    const leaveApproved = await prisma.leave.count({
      where: { status: "ACCEPTED" },
    });
    const leavePending = await prisma.leave.count({
      where: { status: "PENDING" },
    });
    const leaveRejected = await prisma.leave.count({
      where: { status: "REJECTED" },
    });

    res.json({
      success: true,
      data: {
        totalEmployees,
        totalDepartments,
        leaveApproved,
        leavePending,
        leaveRejected,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
