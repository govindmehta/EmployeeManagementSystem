import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Register User
export const registerUser = async (req, res) => {
    const { name, email, password, role, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword, role },
        });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error creating user" });
    }
};

// Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user });
};
