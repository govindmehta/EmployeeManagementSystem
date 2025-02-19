import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;

    const existingDepartment = await prisma.department.findUnique({
      where: { dep_name },
    });

    if (existingDepartment) {
      return res.status(400).json({
        success: false,
        message: "Department already exists.",
      });
    }

    const department = await prisma.department.create({
      data: {
        dep_name,
        description,
      },
    });

    res.status(201).json({ success: true, data: department });
  } catch (error) {
    console.error("Add Department Server Error:", error.message);
    res.status(500).json({ success: false, message: "Add Department Server Error" });
  }
};


export const getDepartments = async (req, res) => {
  try {
    const departments = await prisma.department.findMany();
    res.status(200).json({ success: true, departments });
  } catch (error) {
    console.error("Get Departments Server Error:", error.message);
    res.status(500).json({ success: false, message: "Get Departments Server Error" });
  }
};

export const getDepartmentInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await prisma.department.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ success: true, department });
  } catch (error) {
    console.error("Edit Department Server Error:", error.message);
    res.status(500).json({ success: false, message: "Edit Department Server Error" });
  }
}

export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;
    const department = await prisma.department.update({
      where: {
        id: parseInt(id),
      },
      data: {
        dep_name,
        description,
      },
    });
    res.status(200).json({ success: true, department });
  } catch (error) {
    console.error("Edit Department Server Error:", error.message);
    res.status(500).json({ success: false, message: "Edit Department Server Error" });
  }
}

export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.department.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ success: true, message: "Department deleted successfully" });
  } catch (error) {
    console.error("Delete Department Server Error:", error.message);
    res.status(500).json({ success: false, message: "Delete Department Server Error" });
  }
};