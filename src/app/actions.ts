"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
}

export async function updateCompanySettings(formData: FormData) {
  await requireAuth();

  const missionStatement = formData.get("missionStatement") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;

  await prisma.companyInfo.upsert({
    where: { id: 1 },
    update: { missionStatement, email, phone, address },
    create: {
      id: 1,
      missionStatement,
      email,
      phone,
      address
    }
  });

  revalidatePath("/admin/settings");
  revalidatePath("/");
}

export async function createTeamMember(formData: FormData) {
  await requireAuth();

  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const bio = formData.get("bio") as string;

  await prisma.teamMember.create({
    data: { name, role, bio }
  });

  revalidatePath("/admin/team");
  revalidatePath("/team");
}

export async function deleteTeamMember(id: number) {
  await requireAuth();

  await prisma.teamMember.delete({
    where: { id }
  });

  revalidatePath("/admin/team");
  revalidatePath("/team");
}

export async function updateTeamMember(id: number, formData: FormData) {
  await requireAuth();

  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const bio = formData.get("bio") as string;

  await prisma.teamMember.update({
    where: { id },
    data: { name, role, bio }
  });

  revalidatePath("/admin/team");
  revalidatePath("/team");
}
