import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"

const prisma = new PrismaClient();

const userRegister = async () => {
    try {
        const hashedPassword = await bcrypt.hash("admin",10);
        const newUser = await prisma.user.create({
            data: {  
              name: "admin",
              email: "admin@gmail.com",
              password: hashedPassword,
              role: "admin", 
            },
          });
        console.log(newUser)
    } catch (error) {
        console.log("Error in userRegister in userSeed: ",error.message);
    }
}

userRegister();