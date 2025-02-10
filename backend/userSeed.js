import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"

const prisma = new PrismaClient();

const userRegister = async () => {
    try {
        const hashedPassword = await bcrypt.hash("admin",10);
        const newUser = await prisma.user.create({
            data: {  // Ensure to use 'data' property when creating a new record
              name: "admin",
              email: "admin@gmail.com",
              password: hashedPassword,
              role: "admin", // This must match one of the enum values defined in your Prisma schema.
            },
          });
        console.log(newUser)
    } catch (error) {
        console.log("Error in userRegister in userSeed: ",error.message);
    }
}

userRegister();