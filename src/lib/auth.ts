import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { ensureDbInitialized } from "@/lib/db-init";

export const authOptions: NextAuthOptions = {
  providers: [CredentialsProvider({
    name: "Credentials",
    credentials: { email: { label: "Email", type: "text", placeholder: "admin@aadhicode.com" }, password: { label: "Password", type: "password" } },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) return null;
      await ensureDbInitialized();
      const email = credentials.email.trim().toLowerCase() === "admin" ? "admin@aadhicode.com" : credentials.email.trim().toLowerCase();
      const password = credentials.password.trim();
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return null;
      if (!(await bcrypt.compare(password, user.password))) return null;
      return { id: String(user.id), email: user.email };
    },
  })],
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  secret: process.env.NEXTAUTH_SECRET,
};
