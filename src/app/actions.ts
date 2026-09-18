"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateCompanySettings(formData: FormData) {
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
  revalidatePath("/"); // Revalidate public homepage as well
}
