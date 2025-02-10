import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create or Update Salary
export const updateSalary = async (req, res) => {
    const { userId, baseSalary, bonus, deductions } = req.body;

    if (!userId || !baseSalary) {
        return res.status(400).json({ message: "User ID and base salary are required" });
    }

    const totalSalary = baseSalary + (bonus || 0) - (deductions || 0);

    try {
        const salary = await prisma.salary.upsert({
            where: { userId },
            update: { baseSalary, bonus, deductions, totalSalary },
            create: { userId, baseSalary, bonus, deductions, totalSalary },
        });

        res.status(200).json({ message: "Salary updated successfully", salary });
    } catch (error) {
        res.status(500).json({ message: "Error updating salary", error });
    }
};

// Get Salary by User ID
export const getSalary = async (req, res) => {
    const { userId } = req.params;

    try {
        const salary = await prisma.salary.findUnique({ where: { userId: parseInt(userId) } });
        if (!salary) return res.status(404).json({ message: "Salary record not found" });

        res.json(salary);
    } catch (error) {
        res.status(500).json({ message: "Error fetching salary", error });
    }
};
