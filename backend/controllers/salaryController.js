import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getSalaries = async (req, res) => {
  try {
    const salaries = await prisma.salary.findMany({
      include: { employee: true },
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, salaries });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const addSalary = async (req, res) => {
  const { emp_name, email, totalSalary, paidSalary } = req.body;
  
  try {
    // Look up the employee by name and email
    const employee = await prisma.employee.findFirst({
      where: {
        emp_name,
        email,
      },
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found.",
      });
    }

    // Create salary record
    const salary = await prisma.salary.create({
      data: {
        employeeId: employee.id,
        totalSalary: parseFloat(totalSalary),
        paidSalary: parseFloat(paidSalary),
      },
    });

    res.status(201).json({ success: true, salary });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update an existing salary record by salary ID
export const updateSalary = async (req, res) => {
  const { id } = req.params; // Salary record id
  const { totalSalary, paidSalary } = req.body;
  
  try {
    const salary = await prisma.salary.update({
      where: { id: parseInt(id, 10) },
      data: {
        totalSalary: parseFloat(totalSalary),
        paidSalary: parseFloat(paidSalary),
      },
    });
    res.json({ success: true, salary });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getSalaryById = async (req, res) => {
  const { id } = req.params;
  try {
    const salary = await prisma.salary.findUnique({
      where: { id: parseInt(id, 10) },
      include: { employee: true },
    });
    if (!salary) {
      return res.status(404).json({
        success: false,
        error: "Salary record not found.",
      });
    }
    res.json({ success: true, salary });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};