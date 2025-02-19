import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.json({ success: true, employees });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const addEmployee = async (req, res) => {
  const { emp_name, email, phone, address, departmentName, profilePic } = req.body;
  // Use profilePic from req.body (base64 string) or default value
  const finalProfilePic = profilePic || "../static/images/pic.jpg";

  try {
    const department = await prisma.department.findUnique({
      where: { dep_name: departmentName },
    });

    if (!department) {
      return res.status(404).json({
        success: false,
        error: "Department not found.",
      });
    }

    const employee = await prisma.employee.create({
      data: {
        emp_name,
        email,
        phone,
        address,
        departmentId: department.id,
        profilePic: finalProfilePic,
      },
    });

    res.status(201).json({ success: true, employee });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getEmployeeInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: parseInt(id, 10) },
      include: { department: true },
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found.",
      });
    }

    res.json({ success: true, employee });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}


export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.employee.delete({
      where: { id: parseInt(id, 10) },
    });
    res.json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { emp_name, email, phone, address, departmentName } = req.body;
  const profilePic = req.file ? req.file.path : undefined;

  try {
    const department = await prisma.department.findUnique({
      where: { dep_name: departmentName },
    });

    if (!department) {
      return res.status(404).json({
        success: false,
        error: "Department not found.",
      });
    }

    const updateData = {
      emp_name,
      email,
      phone,
      address,
      departmentId: department.id,
    };

    if (profilePic !== undefined) {
      updateData.profilePic = profilePic;
    }

    const employee = await prisma.employee.update({
      where: { id: parseInt(id, 10) },
      data: updateData,
    });

    res.json({ success: true, employee });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
