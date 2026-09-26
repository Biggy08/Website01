import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

let isInitialized = false;

export async function ensureDbInitialized() {
  if (isInitialized) return;
  try {
    const adminEmail = "admin@aadhicode.com";
    const user = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    const hashedPassword = await bcrypt.hash("password123", 10);

    if (!user) {
      await prisma.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
        },
      });
      console.log("Initialized admin user:", adminEmail);
    }

    isInitialized = true;
  } catch (err) {
    console.warn("DB initialization warning:", err);
  }
}
