import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return the token and a success message.
    return res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Error in authController: ", error.message);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
